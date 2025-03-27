import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import "../styles/RecyclingMap.css";

// --- Fix default Leaflet marker icons (so we don't see "Mark" placeholders).
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// --- Helper component to manually set the map's center and zoom.
function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

function RecyclingMap() {
  // --- States
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Default center (e.g., India)
  const [zoom, setZoom] = useState(4); // Default zoom (fairly zoomed out)
  const [markers, setMarkers] = useState([]); // Markers for the current search
  const [suggestions, setSuggestions] = useState([]);

  // --- Generate "nearby" markers with random offsets.
  //     For each new search, we create 10-15 random markers around the found location.
  const generateNearbyCenters = ([lat, lon]) => {
    const count = Math.floor(Math.random() * (15 - 10 + 1)) + 10; // 10 to 15
    const generated = [];
    for (let i = 0; i < count; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.04;
      const offsetLon = (Math.random() - 0.5) * 0.04;
      generated.push({
        id: `nearby-${i}`,
        name: `Nearby E-Waste Center ${i + 1}`,
        position: [lat + offsetLat, lon + offsetLon],
        address: `Auto-Generated Address ${i + 1}`,
        phone: "(555) 000-0000",
      });
    }
    return generated;
  };

  // --- Fetch suggestions as user types (debounced)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length < 3) {
        setSuggestions([]);
        return;
      }
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            searchQuery
          )}`
        );
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
    const timeoutId = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // --- When user clicks on a suggestion:
  //     1) Zoom to that location.
  //     2) Remove old markers & generate new ones around that location.
  //     3) Clear suggestions.
  const handleSuggestionSelect = (sug) => {
    const { lat, lon, display_name } = sug;
    const newCenter = [parseFloat(lat), parseFloat(lon)];

    // Zoom in to the new location
    setMapCenter(newCenter);
    setZoom(16);

    // Overwrite old markers with newly generated ones
    const newMarkers = generateNearbyCenters(newCenter);
    setMarkers(newMarkers);

    // Update search input to the chosen location
    setSearchQuery(display_name);

    // Clear suggestions
    setSuggestions([]);
  };

  // --- If user clicks the "Search" button without selecting a suggestion
  //     we just take the first result from Nominatim, if any.
  const handleSearch = async () => {
    if (!searchQuery) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        handleSuggestionSelect(data[0]);
      } else {
        alert("Location not found. Please try a different query.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("An error occurred while searching for the location.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">E-Waste Recycling Centers</h2>
      <div className="grid">
        {/* MAP AREA */}
        <div className="map-container">
          <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
          >
            <ChangeView center={mapCenter} zoom={zoom} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">
                OpenStreetMap
              </a> contributors'
            />
            {markers.map((m) => (
              <Marker key={m.id} position={m.position}>
                <Popup>
                  <div>
                    <h3 className="popup-title">{m.name}</h3>
                    <p>{m.address}</p>
                    <p>{m.phone}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* SIDEBAR AREA */}
        <div className="info-section">
          <div className="search-box">
            <h3 className="search-title">Find Centers Near You</h3>
            <input
              type="text"
              placeholder="Enter your location"
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
            {/* SUGGESTIONS LIST */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((sug) => (
                  <li
                    key={sug.place_id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionSelect(sug)}
                  >
                    {sug.display_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* MARKERS LIST */}
          <div className="centers-list">
            {markers.map((m) => (
              <div key={m.id} className="center-card">
                <div className="center-info">
                  <MapPin className="icon" />
                  <div>
                    <h4 className="center-name">{m.name}</h4>
                    <p className="center-address">{m.address}</p>
                    <p className="center-phone">{m.phone}</p>
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
