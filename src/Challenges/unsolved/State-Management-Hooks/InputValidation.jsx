import React from "react";

const InputValidationUI = () => {
  // Input Validation Challenge:
  /**
   * 1. Create a Form UI with input fields for:
   *    - Email
   *    - Password
   * 2. Add placeholder messages for validation rules:
   *    - Valid email format.
   *    - Password should have a minimum of 8 characters, including a number and a special character.
   * Bonus:
   * - Add dynamic error messages for invalid inputs.
   */

  return (
    <div
      style={{ maxWidth: "400px", margin: "20px auto", textAlign: "center" }}
    >
      <h1>Form Validation</h1>
      <input
        type="email"
        placeholder="Enter your email"
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
        type="password"
        placeholder="Enter your password"
        style={{
          padding: "10px",
          marginBottom: "10px",
          display: "block",
          width: "100%",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <button style={{ padding: "10px 20px", marginTop: "10px" }}>
        Submit
      </button>
      <div style={{ marginTop: "20px" }}>
        <p>Validation messages will appear here...</p>
      </div>
    </div>
  );
};

export default InputValidationUI;
