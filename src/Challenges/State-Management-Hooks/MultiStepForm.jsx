import React from "react";

const MultiStepFormUI = () => {
  // Multi-Step Form Challenge:
  /**
   * 1. Create a wizard-style Multi-Step Form UI with:
   *    - At least three steps (e.g., Personal Details, Address, Confirmation).
   *    - "Next" and "Back" buttons to navigate between steps.
   * 2. Add placeholder fields for each step.
   * Bonus:
   * - Show a progress indicator (e.g., "Step 1 of 3").
   */

  return (
    <div
      style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}
    >
      <h1>Multi-Step Form</h1>
      <div style={{ marginBottom: "20px" }}>
        <p>Step 1 of 3: Personal Details</p>
        <input
          type="text"
          placeholder="First Name"
          style={{
            padding: "10px",
            marginBottom: "10px",
            display: "block",
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="text"
          placeholder="Last Name"
          style={{
            padding: "10px",
            marginBottom: "10px",
            display: "block",
            width: "100%",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
      </div>
      <div>
        <button style={{ padding: "10px 20px", marginRight: "10px" }}>
          Back
        </button>
        <button style={{ padding: "10px 20px" }}>Next</button>
      </div>
    </div>
  );
};

export default MultiStepFormUI;
