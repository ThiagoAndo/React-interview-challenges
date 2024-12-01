import React from "react";

const ModalUI = () => {
  // Modal Component Challenge:
  /**
   * 1. Create a reusable Modal UI with:
   *    - A button to open the modal.
   *    - A close button (`×`) inside the modal.
   *    - Dynamic content inside the modal using children.
   * 2. Ensure the modal appears on top of the existing content.
   * Bonus:
   * - Add a backdrop that closes the modal when clicked.
   */

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Modal Component</h1>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Open Modal
      </button>
      <div
        style={{
          display: "none", // Change to "block" to simulate modal visibility
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "20px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          zIndex: 1000,
        }}
      >
        <button
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <p>Modal content goes here...</p>
      </div>
    </div>
  );
};

export default ModalUI;
