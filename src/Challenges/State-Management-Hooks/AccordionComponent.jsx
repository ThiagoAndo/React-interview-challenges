import React from "react";

const AccordionUI = () => {
  // Accordion Component Challenge:
  /**
   * 1. Create an Accordion UI to display a list of FAQ questions.
   *    - Each question can be expanded to show the answer.
   *    - Only one section should be expanded at a time.
   * 2. Use a button or clickable title to toggle each section.
   * Bonus:
   * - Add animations for the toggle effect.
   */

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "left" }}>
      <h1>FAQ Accordion</h1>
      <div style={{ marginBottom: "10px", borderBottom: "1px solid #ddd" }}>
        <h2 style={{ cursor: "pointer" }}>Question 1</h2>
        <p style={{ display: "none", marginTop: "5px" }}>
          Answer 1 will appear here...
        </p>
      </div>
      <div style={{ marginBottom: "10px", borderBottom: "1px solid #ddd" }}>
        <h2 style={{ cursor: "pointer" }}>Question 2</h2>
        <p style={{ display: "none", marginTop: "5px" }}>
          Answer 2 will appear here...
        </p>
      </div>
    </div>
  );
};

export default AccordionUI;
