// In the same file as your SimpleMap component
import React, { useRef } from "react";
import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OverlayMenu from "./OverlayMenu"; // Import the OverlayMenu component
import CropSelectionMenu from "./CropSelectionMenu"; // Import the CropSelectionMenu component

const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = 51.505;
  const longitude = -0.09;

  const polygon = [
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ];

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        <Polygon pathOptions={{ color: "purple" }} positions={polygon}>
          <Popup>I am a popup! You clicked the polygon.</Popup>
        </Polygon>
        {/* Additional map layers or components can be added here */}
      </MapContainer>
      <OverlayMenu /> {/* Use the OverlayMenu component here */}
      <CropSelectionMenu /> {/* Use the OverlayMenu component here */}
    </div>
  );
};

export default SimpleMap;
