import React, { useState } from "react";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";
import { doCreateUserWithEmailAndPassword } from "../../../firebase/auth";
import "./register.css";

const Register = () => {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      // Optionally, add a check for password === confirmPassword here
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
        // After successful registration, you can navigate immediately to the profile.
        navigate("/profile");
      } catch (error) {
        setErrorMessage("Registration failed. Please try again.");
        setIsRegistering(false);
      }
    }
  };

  // If the user is already logged in, redirect them to the profile page.
  if (userLoggedIn) {
    return <Navigate to="/profile" replace />;
  }

  return (
    <>
      <main className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h3>Create a New Account</h3>
          </div>
          <form onSubmit={onSubmit} className="register-form">
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
    </>
  );
};

export default Register;
