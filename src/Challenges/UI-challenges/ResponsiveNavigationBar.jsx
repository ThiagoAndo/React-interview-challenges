import React from "react";

const ResponsiveNavBarUI = () => {
  // Responsive Navigation Bar Challenge:
  /**
   * 1. Create a responsive navigation bar with:
   *    - Links for "Home," "About," "Services," and "Contact."
   *    - Dropdown menus for sub-links under "Services."
   * 2. Ensure the navigation adapts to smaller screen sizes.
   * Bonus:
   * - Add a hamburger menu for mobile devices.
   */

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#333",
        color: "#fff",
      }}
    >
      <div>Logo</div>
      <ul style={{ display: "flex", listStyleType: "none", padding: 0 }}>
        <li style={{ margin: "0 10px" }}>Home</li>
        <li style={{ margin: "0 10px" }}>About</li>
        <li style={{ margin: "0 10px" }}>
          Services
          <ul
            style={{
              listStyleType: "none",
              padding: "5px",
              backgroundColor: "#444",
            }}
          >
            <li>Web Development</li>
            <li>Design</li>
          </ul>
        </li>
        <li style={{ margin: "0 10px" }}>Contact</li>
      </ul>
    </nav>
  );
};

export default ResponsiveNavBarUI;
