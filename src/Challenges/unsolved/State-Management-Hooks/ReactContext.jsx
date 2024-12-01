import React from "react";

const ReactContextUI = () => {
  // React Context Challenge:
  /**
   * 1. Create a Theme Switcher UI that uses React Context to manage the theme.
   *    - Provide two themes: Light and Dark.
   *    - Use Context to manage and distribute the theme across the app.
   * 2. Add a button to toggle between themes.
   * Bonus:
   * - Show the current theme in a styled display area.
   */

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        border: "2px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>React Context Theme</h1>
      <p>Current Theme: Light</p>
      <button style={{ padding: "10px 20px", cursor: "pointer" }}>
        Switch to Dark
      </button>
    </div>
  );
};

export default ReactContextUI;
