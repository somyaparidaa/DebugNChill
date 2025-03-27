import React, { useEffect, useState } from "react";
import { User, Award, Clock, Recycle } from "lucide-react";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";  // ✅ FIXED IMPORT
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase/firebase";
import "../styles/Profile.css";

function Profile() {
    const [device, setDevice] = useState({
        name: "",
        brand: "",
        condition: "Used",
        price: "",
        description: "",
        image: ""
    });

    const handleChange = (e) => {
        setDevice({ ...device, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, "marketplace"), device);
            alert("Device listed successfully!");
            setDevice({ name: "", brand: "", condition: "Used", price: "", description: "", image: "" });
        } catch (error) {
            console.error("Error adding document:", error);
        }
    };

    return (
        <div className="sell-container">
            <h2>Sell Your Device</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Device Name" value={device.name} onChange={handleChange} required />
                <input type="text" name="brand" placeholder="Brand (Apple, Samsung, etc.)" value={device.brand} onChange={handleChange} required />
                <select name="condition" value={device.condition} onChange={handleChange}>
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Damaged">Damaged</option>
                </select>
                <input type="number" name="price" placeholder="Price ($)" value={device.price} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={device.description} onChange={handleChange}></textarea>
                <input type="text" name="image" placeholder="Image URL (Optional)" value={device.image} onChange={handleChange} />
                <button type="submit">List Device</button>
            </form>
        </div>
    );
};

export default Profile;