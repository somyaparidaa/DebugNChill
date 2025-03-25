import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import "../styles/RecyclingMap.css"; // Import the CSS file

const centers = [
  {
    id: 1,
    name: "EcoTech Recycling Center",
    position: [40.7128, -74.006],
    address: "123 Green Street, New York, NY",
    phone: "(555) 123-4567",
  },
  {
    id: 2,
    name: "GreenCycle Solutions",
    position: [40.7282, -73.9942],
    address: "456 Eco Avenue, New York, NY",
    phone: "(555) 987-6543",
  },
];

function RecyclingMap() {
  return (
    <div className="container">
      <h2 className="title">E-Waste Recycling Centers</h2>

      <div className="grid">
        <div className="map-container">
          <MapContainer
            center={[40.7128, -74.006]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {centers.map((center) => (
              <Marker key={center.id} position={center.position}>
                <Popup>
                  <div>
                    <h3 className="popup-title">{center.name}</h3>
                    <p>{center.address}</p>
                    <p>{center.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <div className="info-section">
          <div className="search-box">
            <h3 className="search-title">Find Centers Near You</h3>
            <input
              type="text"
              placeholder="Enter your location"
              className="search-input"
            />
          </div>

          <div className="centers-list">
            {centers.map((center) => (
              <div key={center.id} className="center-card">
                <div className="center-info">
                  <MapPin className="icon" />
                  <div>
                    <h4 className="center-name">{center.name}</h4>
                    <p className="center-address">{center.address}</p>
                    <p className="center-phone">{center.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecyclingMap;
