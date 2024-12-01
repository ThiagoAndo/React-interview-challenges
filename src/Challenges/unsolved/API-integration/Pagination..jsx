import React from "react";

const PaginationUI = () => {
  // Pagination Challenge:
  /**
   * 1. Create a Pagination UI with:
   *    - A list of items (e.g., posts or products).
   *    - "Previous" and "Next" buttons for navigation.
   * 2. Show 10 items per page.
   * Bonus:
   * - Add page numbers for navigation.
   */

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Paginated List</h1>
      <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
        <li>Item 4</li>
        <li>Item 5</li>
        <li>Item 6</li>
        <li>Item 7</li>
        <li>Item 8</li>
        <li>Item 9</li>
        <li>Item 10</li>
      </ul>
      <div style={{ marginTop: "20px" }}>
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
        >
          Previous
        </button>
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationUI;
