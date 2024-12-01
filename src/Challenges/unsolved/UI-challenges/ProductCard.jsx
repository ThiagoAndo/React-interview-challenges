import React from "react";

const ProductCardUI = () => {
  // Product Card Challenge:
  /**
   * 1. Create a Product Card UI with:
   *    - An image placeholder.
   *    - Product name and price.
   *    - An "Add to Cart" button.
   * 2. Add hover effects to highlight the card.
   * Bonus:
   * - Show a "Sale" badge for discounted products.
   */

  return (
    <div
      style={{
        width: "300px",
        padding: "20px",
        margin: "20px auto",
        border: "1px solid #ddd",
        borderRadius: "10px",
        textAlign: "center",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "transform 0.3s",
      }}
    >
      <img
        src="https://via.placeholder.com/150"
        alt="Product"
        style={{ width: "100%", marginBottom: "10px", borderRadius: "10px" }}
      />
      <h2>Product Name</h2>
      <p>$99.99</p>
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
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCardUI;
