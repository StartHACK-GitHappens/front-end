import React, { useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  ImageOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import OverlayMenu from "./components/OverlayMenu"; // Import the OverlayMenu component
import CropSelectionMenu from "./components/CropSelectionMenu"; // Import the CropSelectionMenu component
import { Icon } from "leaflet";
import { fieldsData } from "./fields";
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css" 

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

const SimpleMap = ({ centerLatitude, centerLongitude }) => {
  const mapRef = useRef(null);

  // CropSelectionMenu
  const [selectedCrop, setSelectedCrop] = useState("");
  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  // Central coordinates of the image
  const imageCenterLat = -28.4275752;
  const imageCenterLng = 21.6859793;
  // Size of the image in kilometers
  const imageSizeKm = 2.24;
  return (
      <MapContainer
        center={[centerLatitude, centerLongitude]}
        zoom={14}
        ref={mapRef}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        />
        {
          fieldsData.features.map((field) => {
            const coordinates = field.geometry.coordinates.map((item) => [item[0], item[1]]);
            console.log(coordinates);

            return (<Polygon
                pathOptions={{
                  fillColor: field.color,
                  fillOpacity: 0.7,
                  weight: 2,
                  opacity: 1
                  // color: 'white'
                }}
                positions={coordinates}
              />)
          })
        }
        {/* Use the createImageOverlay function to add the custom image */}
        {selectedCrop === "🌽|Maize" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "maize-removebg-preview.png"
        )}
        <OverlayMenu />
        
        <CropSelectionMenu handleCropChange={handleCropChange} />
      </MapContainer>
  );
};

export default SimpleMap;