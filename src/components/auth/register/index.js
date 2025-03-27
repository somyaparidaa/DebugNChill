import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
// Import the Firestore database instance and Firestore functions
import { db } from "../../../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        // Create the user with email and password.
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );
        const uid = userCredential.user.uid;

        // Save additional user data (name and email) in Firestore.
        await setDoc(doc(db, "users", uid), {
          name: name,
          email: email,
        });

        // Navigate to the profile page after successful registration.
        navigate("/profile");
      } catch (error) {
        setErrorMessage("Registration failed. Please try again.");
        setIsRegistering(false);
        console.error("Error during registration:", error);
      }
    }
  };

  // Redirect to profile if already logged in.
  if (userLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <main className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h3>Create a New Account</h3>
        </div>
        <form onSubmit={onSubmit} className="register-form">
          {/* Name Field */}
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              disabled={isRegistering}
              type="password"
              autoComplete="off"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {errorMessage && (
            <span className="error-message">{errorMessage}</span>
          )}

          <button
            type="submit"
            disabled={isRegistering}
            className="register-button"
          >
            {isRegistering ? "Signing Up..." : "Sign Up"}
          </button>

          <div className="register-footer">
            Already have an account?{" "}
            <Link to="/login" className="footer-link">
              Continue
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;
