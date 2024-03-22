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

const SimpleMap = ({ centerLatitude, centerLongitude}) => {
  const mapRef = useRef(null);
  
  const customIcon = new Icon({
    iconUrl: require("./img/marker-icon.png"),
    iconSize: [38, 38]
  });

  const _created = (e) => {
    let layer = e.layer;
    let latLngs = layer.getLatLngs();
    let coordinates = latLngs[0].map((latLng) => {
      return [latLng.lat, latLng.lng];
    });
    console.log(coordinates); // This will log the coordinates in the console.
    // Convert JavaScript object to JSON string.
    const jsonString = JSON.stringify(coordinates);
    
    // An anchor element is used to allow the user to download the file.
    const downloadLink = document.createElement('a');

    // Create a Blob object represent a file-like object of immutable,
    // raw data; they can be read as text or binary data
    const blob = new Blob([jsonString], { type: 'text/plain' });
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'coordinates.txt';
    
    // This is necessary because the link isn't part of the DOM
    document.body.appendChild(downloadLink);
    
    downloadLink.click();

    // Remove the link from the body
    document.body.removeChild(downloadLink);
  }

  // Central coordinates of the image
  const imageCenterLat = -28.4275752;
  const imageCenterLng = 21.6859793;
  // Size of the image in kilometers
  const imageSizeKm = 2.24;
  // Path to the image
  const imagePath = "/truth.png";

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
        {createImageOverlay(
          imageCenterLat,
          imageCenterLng,
          imageSizeKm,
          imagePath
        )}
        <OverlayMenu />
        <CropSelectionMenu />
      </MapContainer>
  );
};

export default SimpleMap;