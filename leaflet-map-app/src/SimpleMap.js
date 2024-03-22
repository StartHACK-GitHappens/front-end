import React, { useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OverlayMenu from "./OverlayMenu"; // Import the OverlayMenu component
import CropSelectionMenu from "./CropSelectionMenu"; // Import the CropSelectionMenu component

// Function to create an ImageOverlay component
function createImageOverlay(centerLat, centerLng, imageSizeKm, imagePath) {
  const kmInDegrees = 1 / 110.574;
  const halfImageSizeInDegrees = (imageSizeKm / 2) * kmInDegrees;

  const vertBias = halfImageSizeInDegrees * 0.99;
  const horBias = halfImageSizeInDegrees * 1.11;

  const imageBounds = [
    [
      centerLat - halfImageSizeInDegrees - vertBias,
      centerLng - halfImageSizeInDegrees + horBias,
    ],
    [
      centerLat + halfImageSizeInDegrees - vertBias,
      centerLng + halfImageSizeInDegrees + horBias,
    ],
  ];

  return <ImageOverlay url={imagePath} bounds={imageBounds} />;
}

const SimpleMap = () => {
  const mapRef = useRef(null);
  const latitude = -28.42;
  const longitude = 21.68;

  const polygon = [
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047],
  ];

  // Central coordinates of the image
  const imageCenterLat = -28.4275752;
  const imageCenterLng = 21.6859793;
  // Size of the image in kilometers
  const imageSizeKm = 2.24;
  // Path to the image
  const imagePath = "/truth.png";

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
        {/* Use the createImageOverlay function to add the custom image */}
        {createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          imagePath
        )}
      </MapContainer>
      <OverlayMenu /> {/* Use the OverlayMenu component here */}
      <CropSelectionMenu /> {/* Use the CropSelectionMenu component here */}
    </div>
  );
};

export default SimpleMap;
