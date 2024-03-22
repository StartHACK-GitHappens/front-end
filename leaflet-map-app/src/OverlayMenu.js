import React, { useState } from "react";

const OverlayMenu = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedDisease, setSelectedDisease] = useState("");

  const handleOptionChange = (event) => {
    const selected = event.target.value;
    setSelectedOption(selected);
    // Reset the disease selection when the main option changes
    setSelectedDisease("");
  };

  const handleDiseaseChange = (event) => {
    setSelectedDisease(event.target.value);
  };

  // Determine if the color bar should be displayed
  const showColorBar =
    selectedOption && (selectedOption !== "Disease Risk" || selectedDisease);

  return (
    <div
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
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          style={{ width: "100%", fontSize: "1.5em" }}
        >
          <option value="">Select an Option</option>
          <option value="NDVI">NDVI</option>
          <option value="Disease Risk">Disease Risk</option>
          <option value="Yield">Yield</option>
        </select>

        {selectedOption === "Disease Risk" && (
          <select
            value={selectedDisease}
            onChange={handleDiseaseChange}
            style={{ marginTop: "10px", width: "100%" }}
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
        )}
      </div>
      {showColorBar && (
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
  );
};

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

export default OverlayMenu;
