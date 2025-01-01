import React from "react";

const UserAuthenticationUI = () => {
  // User Authentication Challenge:
  /**
   * 1. Create a login form with:
   *    - Input fields for "Email" and "Password."
   *    - A "Login" button to send data.
   * 2. Add placeholders for:
   *    - Success message.
   *    - Error message.
   * Bonus:
   * - Add password visibility toggle (optional).
   */

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Enter your email"
        style={{
          padding: "10px",
          marginBottom: "10px",
          display: "block",
          width: "80%",
          margin: "10px auto",
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
          width: "80%",
          margin: "10px auto",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <button style={{ padding: "10px 20px", cursor: "pointer" }}>Login</button>
      <div style={{ marginTop: "20px" }}>
        <p>Messages will appear here...</p>
      </div>
    </div>
  );
};

export default UserAuthenticationUI;
