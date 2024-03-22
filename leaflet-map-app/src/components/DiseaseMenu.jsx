import React, { useState } from "react";

const DiseaseMenu = ({ handleDiseaseChange }) => {
    return (
        <select
            onChange={handleDiseaseChange}
            style={{ marginTop: "10px", width: "100%", fontSize: "1.2em" }}
          >
            <option value="">Select a Disease</option>
            <option value="Septoria Leaf Blotch">Septoria Leaf Blotch</option>
            <option value="Powdery Mildew">Powdery Mildew</option>
            <option value="Blackleg">Blackleg</option>
            <option value="White Spot P.C.Spore">
              White Leaf Spot P.C.Spore
            </option>
            <option value="Brown Rust">Brown Rust</option>
          </select>
    )
};

export default DiseaseMenu;