import React, { useState } from "react";

const OverlayMenu = ({ handleOptionChange }) => {
  return (
        <select
          onChange={handleOptionChange}
          style={{ width: "100%", fontSize: "1.5em" }}
        >
          <option value="">Select an Option</option>
          <option value="NDVI">NDVI</option>
          <option value="Disease Risk">Disease Risk</option>
          <option value="Yield">Yield</option>
        </select>
  );
};

export default OverlayMenu;
