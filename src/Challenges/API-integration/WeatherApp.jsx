import React from "react";

const WeatherAppUI = () => {
  // Weather App Challenge:
  /**
   * 1. Create a Weather App UI with:
   *    - A search input to enter a city name.
   *    - A button to fetch weather data.
   *    - A display area to show weather details such as temperature and weather condition.
   * 2. Include placeholders for:
   *    - Loading state.
   *    - Error state.
   * Bonus:
   * - Display weather icons based on the condition.
   */

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        style={{
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <button
        style={{ padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
      >
        Get Weather
      </button>
      <div style={{ marginTop: "20px" }}>
        <p>Weather details will appear here...</p>
      </div>
    </div>
  );
};

export default WeatherAppUI;
