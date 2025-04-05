import React, { useState, useEffect } from "react";
import {
  User,
  Award,
  Clock,
  Recycle,
  Camera,
  Smartphone,
  DollarSign,
  FileText,
  Tag,
  Save,
  X,
} from "lucide-react";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../styles/Profile.css";

function Profile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("sell");
  const [isLoading, setIsLoading] = useState(false);
  const [myListings, setMyListings] = useState([]);
  const [previewMode, setPreviewMode] = useState(false);

  const [device, setDevice] = useState({
    name: "",
    brand: "",
    condition: "Used",
    price: "",
    description: "",
    image: "https://via.placeholder.com/300",
    createdAt: new Date(),
    userId: "",
    username: "",
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setDevice((prev) => ({
          ...prev,
          userId: user.uid,
          username: user.displayName || user.email.split("@")[0],
        }));

        // Load user's listings
        fetchMyListings(user.uid);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchMyListings = async (userId) => {
    try {
      setIsLoading(true);
      const q = query(
        collection(db, "marketplace"),
        where("userId", "==", userId)
      );
      const querySnapshot = await getDocs(q);

      const listings = [];
      querySnapshot.forEach((doc) => {
        listings.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setMyListings(listings);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice({
      ...device,
      [name]:
        name === "price" ? (value === "" ? "" : parseFloat(value)) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newDevice = {
        ...device,
        createdAt: new Date(),
      };

      await addDoc(collection(db, "marketplace"), newDevice);

      // Show success notification
      const notification = document.createElement("div");
      notification.className = "success-notification";
      notification.innerHTML = `<div class="success-icon">✓</div>Device listed successfully!`;
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 500);
      }, 3000);

      // Reset form
      setDevice({
        name: "",
        brand: "",
        condition: "Used",
        price: "",
        description: "",
        image: "https://via.placeholder.com/300",
        userId: currentUser.uid,
        username: currentUser.displayName || currentUser.email.split("@")[0],
        createdAt: new Date(),
      });

      // Refresh listings
      fetchMyListings(currentUser.uid);
      setPreviewMode(false);
    } catch (error) {
      console.error("Error adding document:", error);
      alert("Error listing device. Please try again.");
    }

    setIsLoading(false);
  };

  const togglePreview = () => {
    setPreviewMode(!previewMode);
  };

  const conditionIcons = {
    New: <Award className="condition-icon new" />,
    Used: <Clock className="condition-icon used" />,
    Damaged: <Recycle className="condition-icon damaged" />,
  };

  const getConditionClass = (condition) => {
    return condition.toLowerCase();
  };

  return (
    <div className="profile-container">
      <div className="profile-tabs">
        <button
          className={`tab-button ${activeTab === "sell" ? "active" : ""}`}
          onClick={() => setActiveTab("sell")}
        >
          <Tag size={18} />
          <span>Sell Device</span>
        </button>
        <button
          className={`tab-button ${activeTab === "listings" ? "active" : ""}`}
          onClick={() => setActiveTab("listings")}
        >
          <Smartphone size={18} />
          <span>My Listings</span>
        </button>
      </div>

      {activeTab === "sell" && (
        <div className="sell-section">
          {!previewMode ? (
            <div className="sell-container">
              <div className="section-header">
                <h2>
                  <Tag size={20} /> Sell Your Device
                </h2>
                <p>
                  Complete the form below to list your device on the marketplace
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="lbl" htmlFor="name">
                    <Smartphone size={16} /> Device Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="e.g. iPhone 12 Pro"
                    value={device.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="brand">
                    <Award size={16} /> Brand
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    placeholder="e.g. Apple, Samsung, etc."
                    value={device.brand}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="condition">
                      <Clock size={16} /> Condition
                    </label>
                    <select
                      id="condition"
                      name="condition"
                      value={device.condition}
                      onChange={handleChange}
                      className={`condition-select ${getConditionClass(
                        device.condition
                      )}`}
                    >
                      <option value="New">New</option>
                      <option value="Used">Used</option>
                      <option value="Damaged">Damaged</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">
                      <DollarSign size={16} /> Price
                    </label>
                    <div className="price-input">
                      <span className="currency-symbol">$</span>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="0.00"
                        value={device.price}
                        onChange={handleChange}
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="description">
                    <FileText size={16} /> Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Describe your device's features, condition, included accessories, etc."
                    value={device.description}
                    onChange={handleChange}
                  ></textarea>
                  <div className="char-count">
                    {device.description.length}/500
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="image">
                    <Camera size={16} /> Image URL
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    placeholder="Paste an image URL"
                    value={device.image}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="preview-button"
                    onClick={togglePreview}
                  >
                    Preview Listing
                  </button>
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "List Device"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="preview-container">
              <div className="preview-header">
                <h3>Preview Listing</h3>
                <button className="close-preview" onClick={togglePreview}>
                  <X size={18} />
                </button>
              </div>

              <div className="device-card preview">
                <div className="device-image">
                  <img
                    src={device.image || "https://via.placeholder.com/300"}
                    alt={device.name}
                  />
                </div>
                <div className="device-content">
                  <div className="device-header">
                    <h3>{device.name || "Device Name"}</h3>
                    <div className="device-price">
                      ${parseFloat(device.price || 0).toFixed(2)}
                    </div>
                  </div>
                  <div className="device-brand">{device.brand || "Brand"}</div>
                  <div
                    className={`device-condition ${getConditionClass(
                      device.condition
                    )}`}
                  >
                    {conditionIcons[device.condition]}
                    {device.condition}
                  </div>
                  <div className="device-description">
                    {device.description || "No description provided."}
                  </div>
                  <div className="device-footer">
                    <div className="seller-info">
                      <User size={16} />
                      <span>
                        {currentUser?.displayName ||
                          currentUser?.email?.split("@")[0] ||
                          "You"}
                      </span>
                    </div>
                    <div className="listing-date">Listed just now</div>
                  </div>
                </div>
              </div>

              <div className="preview-actions">
                <button className="edit-button" onClick={togglePreview}>
                  Edit Listing
                </button>
                <button
                  className="publish-button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Publishing..." : "Publish Listing"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === "listings" && (
        <div className="listings-container">
          <div className="section-header">
            <h2>
              <Smartphone size={20} /> My Device Listings
            </h2>
            <p>Manage all your marketplace listings</p>
          </div>

          {isLoading ? (
            <div className="loading-spinner">Loading your listings...</div>
          ) : myListings.length > 0 ? (
            <div className="listings-grid">
              {myListings.map((listing) => (
                <div className="device-card" key={listing.id}>
                  <div className="device-image">
                    <img
                      src={listing.image || "https://via.placeholder.com/300"}
                      alt={listing.name}
                    />
                  </div>
                  <div className="device-content">
                    <div className="device-header">
                      <h3>{listing.name}</h3>
                      <div className="device-price">
                        ${parseFloat(listing.price).toFixed(2)}
                      </div>
                    </div>
                    <div className="device-brand">{listing.brand}</div>
                    <div
                      className={`device-condition ${getConditionClass(
                        listing.condition
                      )}`}
                    >
                      {conditionIcons[listing.condition]}
                      {listing.condition}
                    </div>
                    <div className="device-description">
                      {listing.description || "No description provided."}
                    </div>
                    <div className="device-footer">
                      <div className="listing-date">
                        Listed{" "}
                        {listing.createdAt?.toDate
                          ? listing.createdAt.toDate().toLocaleDateString()
                          : new Date().toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <Smartphone size={48} />
              <h3>No Listings Yet</h3>
              <p>You haven't listed any devices for sale yet.</p>
              <button
                className="tab-button"
                onClick={() => setActiveTab("sell")}
              >
                Create Your First Listing
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Profile;
