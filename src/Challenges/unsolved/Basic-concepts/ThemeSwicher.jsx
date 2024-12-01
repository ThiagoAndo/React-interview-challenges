import React, { useState } from "react";

const ThemeSwitcher = () => {
  // Challenge Instructions:
  /**
   * Theme Switcher Challenge:
   * 1. Create a component that toggles between light and dark themes.
   * 2. Use state to manage the theme (use `useState`).
   * 3. Change the background color and text color dynamically based on the selected theme.
   * 4. Add a button to toggle between themes.
   *    - The button should display the appropriate label (e.g., "Switch to Dark Mode").
   * 5. Apply the theme globally to the component.
   * Bonus:
   * - Persist the theme using localStorage to save the user's preference.
   * - Add a smooth transition effect between themes.
   */

  const [isDarkMode, setIsDarkMode] = useState(false); // State for theme

  // Toggle theme handler
  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);

  // Dynamic styles
  const themeStyles = {
    backgroundColor: isDarkMode ? "#333" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s ease-in-out",
  };

  const buttonStyles = {
    padding: "10px 20px",
    backgroundColor: isDarkMode ? "#fff" : "#333",
    color: isDarkMode ? "#333" : "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  };

  return (
    <div style={themeStyles}>
      <h1>Theme Switcher</h1>
      <p>
        Current Theme:{" "}
        <strong>{isDarkMode ? "Dark Mode" : "Light Mode"}</strong>
      </p>
      <button style={buttonStyles} onClick={toggleTheme}>
        Switch to {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
