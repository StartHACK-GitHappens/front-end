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
import DiseaseMenu from "./components/DiseaseMenu";

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

// Style for the container of dropdowns
const dropdownContainerStyle = {
  backgroundColor: "white",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
};

// Style for individual elements like the color bar and its container
const elementStyle = {
  marginTop: "10px",
  borderRadius: "10px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
  padding: "0 10px", // Padding added for the color bar container
};

const SimpleMap = ({ centerLatitude, centerLongitude, hideFilters }) => {
  const mapRef = useRef(null);

  // CropSelectionMenu
  const [selectedCrop, setSelectedCrop] = useState("");
  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value);
  };

  // OverlayMenu
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setSelectedDisease("");
  };
  const handleDiseaseChange = (e) => {
    setSelectedDisease(e.target.value);
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

      {selectedCrop === "" && selectedOption === "" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "truth.png"
        )}

        {selectedCrop === "" && selectedOption === "NDVI" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "ndvi_colored__1_-removebg-preview.png"
        )}

        {selectedCrop === "" && selectedOption === "Yield" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "yield__3_-removebg-preview.png"
        )}

        {selectedCrop === "🌽|Maize" && selectedOption === "" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "maize-removebg-preview.png"
        )}

        {selectedCrop === "🌽|Maize" && selectedOption === "NDVI" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "ndvi_maize_colored__1_-removebg-preview.png"
        )}

        {selectedCrop === "🌽|Maize" && selectedOption === "Yield" && createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          "yield_maize__3_-removebg-preview.png"
        )}

        {hideFilters === "false" && <div
          style={{
            position: "absolute",
            top: "100px",
            right: "15px",
            zIndex: 1000,
            backgroundColor: "rgba(255, 255, 255, 0.8)", // 80% transparent background
            padding: "10px",
            border: "1px solid #999",
            borderRadius: "5px",
            width: "250px", // Set a specific width for the entire menu
          }}
        >
          <p style={{ margin: "0 0 10px", fontSize: "1.5em" }}>Map Tools</p>
          <div style={dropdownContainerStyle}>
            <OverlayMenu handleOptionChange={handleOptionChange} />
            {selectedOption === "Disease Risk" && (<DiseaseMenu handleDiseaseChange={handleDiseaseChange} />)}
          </div>

          {(selectedOption !== "Disease Risk" || selectedDisease) && (
            <div
              style={{
                ...elementStyle,
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span style={{ marginRight: "5px" }}>0</span>{" "}
              {/* Number at the start of the color bar */}
              <div
                style={{
                  height: "20px",
                  flex: "1",
                  background: "linear-gradient(to right, #0000ff, #ff0000)",
                }}
              />
              <span style={{ marginLeft: "5px" }}>1</span>{" "}
              {/* Number at the end of the color bar */}
            </div>
          )}
        </div>
        }
        {hideFilters === "false" && <CropSelectionMenu handleCropChange={handleCropChange} />}
  
      </MapContainer>
  );
};

export default SimpleMap;