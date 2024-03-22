// In the same file as your SimpleMap component
import React, { useRef } from "react";
import { MapContainer, TileLayer, Polygon, Popup, Marker, FeatureGroup, GeoJSON } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import OverlayMenu from "./OverlayMenu"; // Import the OverlayMenu component
import CropSelectionMenu from "./CropSelectionMenu"; // Import the CropSelectionMenu component
import { Icon } from "leaflet";
import { fieldsData } from "./fields";
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"

const SimpleMap = () => {
  const mapRef = useRef(null);
  const centerLatitude = 47.46672096160886;
  const centerLongitude = 9.423863598100613;
  
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

  return (
    // <div style={{ height: "100vh", width: "100vw" }}>
      <MapContainer
        center={[centerLatitude, centerLongitude]}
        zoom={15}
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
        
        {/* <FeatureGroup>
          <EditControl position="topright" onCreated={_created} />
        </FeatureGroup> */}
        
      <OverlayMenu />
      <CropSelectionMenu /> 
      </MapContainer>
    // </div>
  );
};

export default SimpleMap;
