// CropSelectionMenu.js
import React, { useState } from "react";

const CropSelectionMenu = ({ handleCropChange }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "100px",
        left: "25px",
        zIndex: 1000,
        backgroundColor: "rgba(255, 255, 255, 0.8)", // 80% transparent background
        padding: "10px",
        border: "1px solid #999",
        borderRadius: "5px",
        width: "200px", // Set a specific width for the menu
      }}
    >
      <div style={{ width: "100%" }}>
        <select
          onChange={handleCropChange}
          style={{ width: "100%", fontSize: "1.5em" }}
        >
          <option value="">Select a Crop</option>
          <option value="🌱|Cotton">🌱| Cotton</option>
          <option value="🌴|Dates">🌴| Dates</option>
          <option value="🌾|Grass">🌾| Grass</option>
          <option value="🌿|Lucern">🌿| Lucern</option>
          <option value="🌽|Maize">🌽| Maize</option>
          <option value="🌰|Pecan">🌰| Pecan</option>
          <option value="🍇|Vineyard">🍇| Vineyard</option>
        </select>
      </div>
    </div>
  );
};

export default CropSelectionMenu;
