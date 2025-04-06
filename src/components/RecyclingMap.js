import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { MapPin, Search, Phone, Clock, ExternalLink, Filter } from "lucide-react";
import "../styles/RecyclingMap.css";

function RecyclingMap() {
  // States for map and search functionality
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default center (e.g., India)
  const [zoom, setZoom] = useState(4); // Default zoom (zoomed out)
  const [markers, setMarkers] = useState([]); // Generated nearby markers
  const [filteredMarkers, setFilteredMarkers] = useState([]); // Filtered markers based on types
  const [suggestions, setSuggestions] = useState([]); // Suggestion list from geocoding API
  const [selectedMarker, setSelectedMarker] = useState(null); // For info window display
  const [filters, setFilters] = useState({
    electronics: true,
    batteries: true,
    appliances: true,
    popular: true
  });
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Generate random nearby centers
  const generateNearbyCenters = (centerCoords, locationName) => {
    const count = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
    const centerTypes = ["Electronics Recycling", "E-Waste Collection", "Tech Recycling"];
    const streetNames = ["Green St", "Eco Rd", "Recycle Ave", "Sustainable Way"];
    
    return Array.from({ length: count }, (_, i) => {
      const offsetLat = (Math.random() - 0.5) * 0.05;
      const offsetLng = (Math.random() - 0.5) * 0.05;
      
      return {
        id: `center-${Date.now()}-${i}`,
        name: `${locationName} ${centerTypes[i % centerTypes.length]} ${i + 1}`,
        position: { 
          lat: centerCoords.lat + offsetLat, 
          lng: centerCoords.lng + offsetLng 
        },
        address: `${Math.floor(Math.random() * 1000) + 1} ${streetNames[i % streetNames.length]}`,
        phone: `+44 20 ${Math.floor(1000 + Math.random() * 9000)} ${Math.floor(1000 + Math.random() * 9000)}`,
        hours: ["Mon-Fri: 9AM-5PM", "Mon-Sat: 8AM-6PM"][i % 2],
        website: "https://example.com",
        types: ["electronics", "batteries", "appliances"].filter(() => Math.random() > 0.5),
        distance: (Math.random() * 5 + 0.5).toFixed(1)
      };
    });
  };

  // Filter markers based on selected filters
  useEffect(() => {
    const filtered = markers.filter(marker => {
      return Object.keys(filters).some(filter => 
        filters[filter] && marker.types?.includes(filter)
      );
    });
    setFilteredMarkers(filtered.length > 0 ? filtered : markers);
  }, [filters, markers]);

  // Fetch location suggestions (using OpenStreetMap/Nominatim for geocoding)
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
          )}&limit=5`
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

  // When a suggestion is selected: update map center, zoom, markers, and search input.
  const handleSuggestionSelect = (sug) => {
    const { lat, lon, display_name } = sug;
    const newCenter = { lat: parseFloat(lat), lng: parseFloat(lon) };

    setMapCenter(newCenter);
    setZoom(14);

    const newMarkers = generateNearbyCenters(newCenter, display_name.split(',')[0]);
    setMarkers(newMarkers);

    setSearchQuery(display_name);
    setSuggestions([]);
    setHasSearched(true);
  };

  // Handle search when button is clicked or Enter is pressed
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      
      if (data && data.length > 0) {
        const firstResult = data[0];
        const newCenter = { lat: parseFloat(firstResult.lat), lng: parseFloat(firstResult.lon) };
        const newMarkers = generateNearbyCenters(
          newCenter, 
          firstResult.display_name.split(',')[0]
        );
        
        setMapCenter(newCenter);
        setZoom(14);
        setMarkers(newMarkers);
        setSuggestions([]);
      } else {
        alert("Location not found. Please try a different query.");
      }
    } catch (error) {
      console.error("Error searching location:", error);
      alert("An error occurred while searching for the location.");
    } finally {
      setLoading(false);
    }
  };

  // Get user's current location
  const getUserLocation = () => {
    setLoading(true);
    setHasSearched(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };
        const newMarkers = generateNearbyCenters(newCenter, "Your Location");
        
        setMapCenter(newCenter);
        setZoom(14);
        setMarkers(newMarkers);
        setLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        setLoading(false);
        alert("Could not retrieve your location. Please check your browser settings.");
      }
    );
  };

  // Google Maps container style
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  // Replace with your actual API key
  const googleMapsApiKey = "AIzaSyBeLiZPuc0TLEot4PhA1rPYwuYRx2R7zCc";

  return (
    <div className="container">
      <h2 className="title">E-Waste Recycling Centers</h2>
      <div className="grid">
        {/* MAP AREA */}
        <div className="map-container">
          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={zoom}
              options={{
                styles: [
                  {
                    "featureType": "poi.business",
                    "stylers": [{ "visibility": "off" }]
                  },
                  {
                    "featureType": "water",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#d3d3d3" }]
                  },
                  {
                    "featureType": "poi.park",
                    "elementType": "geometry.fill",
                    "stylers": [{ "color": "#e6f7e1" }]
                  }
                ],
                mapTypeControl: false,
                streetViewControl: false,
                fullscreenControl: false,
              }}
            >
              {filteredMarkers.map((m) => (
                <Marker
                  key={m.id}
                  position={m.position}
                  onClick={() => setSelectedMarker(m)}
                  icon={{
                    url: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
                    scaledSize: new window.google.maps.Size(25, 41),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(12, 41),
                  }}
                />
              ))}
              {selectedMarker && (
                <InfoWindow
                  position={selectedMarker.position}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className="info-window-content">
                    <h3 className="popup-title">{selectedMarker.name}</h3>
                    <p>{selectedMarker.address}</p>
                    <p><Phone size={14} /> {selectedMarker.phone}</p>
                    {selectedMarker.hours && <p><Clock size={14} /> {selectedMarker.hours}</p>}
                    {selectedMarker.website && (
                      <a
                        href={selectedMarker.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="center-button"
                      >
                        <ExternalLink size={14} /> Visit Website
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        </div>

        {/* SIDEBAR AREA */}
        <div className="info-section">
          {/* Search Box */}
          <div className="search-box">
            <div className="search-title">
              <span>Find Recycling Centers</span>
            </div>
            <div className="search-input-group">
              {/* <Search className="search-input-icon" size={18} /> */}
              <input
                type="text"
                className="search-input"
                placeholder="Enter city or address..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button className="search-button" onClick={handleSearch}>
                Search
              </button>
            </div>
            {suggestions.length > 0 && (
              <div className="suggestions-list">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.place_id}
                    className="suggestion-item"
                    onClick={() => handleSuggestionSelect(suggestion)}
                  >
                    {suggestion.display_name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="filters-box">
            <div className="filters-title">
              <span>Filter Centers</span>
            </div>
            <div className="filters-options">
              {['electronics', 'batteries', 'appliances', 'popular'].map((filter) => (
                <label key={filter} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters[filter]}
                    onChange={(e) => setFilters({ ...filters, [filter]: e.target.checked })}
                  />
                  <span>{filter.charAt(0).toUpperCase() + filter.slice(1)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Statistics */}
          <div className="stats-box">
            <div className="stat-card">
              <div className="stat-value">{filteredMarkers.length}</div>
              <div className="stat-label">Centers Found</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {filteredMarkers.length > 0
                  ? (filteredMarkers.reduce((sum, m) => sum + parseFloat(m.distance || 0), 0) / 
                    filteredMarkers.length).toFixed(1)
                  : '0.0'}
              </div>
              <div className="stat-label">Avg Distance (km)</div>
            </div>
          </div>

          {/* Centers List */}
          <div className="centers-list">
            {loading ? (
              <div className="summary-box">Loading centers...</div>
            ) : hasSearched ? (
              filteredMarkers.length > 0 ? (
                filteredMarkers.map((center) => (
                  <div 
                    key={center.id} 
                    className="center-card"
                    onClick={() => {
                      setSelectedMarker(center);
                      setMapCenter(center.position);
                    }}
                  >
                    <div className="center-info">
                      <MapPin className="icons" size={20} />
                      <div>
                        <h3 className="center-name">{center.name}</h3>
                        <p className="center-address">{center.address}</p>
                        <p className="center-phone">
                          <Phone size={14} /> {center.phone}
                        </p>
                        {center.hours && (
                          <p className="center-phone">
                            <Clock size={14} /> {center.hours}
                          </p>
                        )}
                        {center.website && (
                          <a
                            href={center.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="center-button"
                          >
                            <ExternalLink size={14} /> Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="summary-box">
                  <span className="summary-text">
                    No centers match your filters. Try adjusting your filters or search in a different area.
                  </span>
                </div>
              )
            ) : (
              <div className="summary-box">
                <span className="summary-text">
                  Start by searching a location or{' '}
                  <button
                    onClick={getUserLocation}
                    className="text-green-600 font-semibold hover:underline"
                  >
                    use your current location
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecyclingMap;