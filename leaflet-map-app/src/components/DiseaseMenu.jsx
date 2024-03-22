import React, { useState } from "react";

const DiseaseMenu = ({ handleDiseaseChange }) => {
    return (
        <select
            onChange={handleDiseaseChange}
            style={{ marginTop: "10px", width: "100%", fontSize: "1.2em" }}
          >
            <option value="">Select a Disease</option>
            <option value="CornFusariumHeadBlight">Fusarium Head Blight</option>
            <option value="CornGrayLeafSpot">Gray Leaf Spot</option>
            <option value="TarSpot">Tar Spot</option>
          </select>
    )
};

export default DiseaseMenu;