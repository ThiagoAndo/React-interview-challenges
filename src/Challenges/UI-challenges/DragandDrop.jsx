import React from "react";

const DragDropUI = () => {
  // Drag and Drop Challenge:
  /**
   * 1. Create a Drag-and-Drop UI with:
   *    - A list of draggable tasks.
   *    - A droppable area where tasks can be rearranged.
   * 2. Ensure the list updates dynamically based on the task positions.
   * Bonus:
   * - Highlight the droppable area when a task is dragged over it.
   */

  return (
    <div
      style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}
    >
      <h1>Drag and Drop</h1>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            cursor: "grab",
          }}
        >
          Task 1
        </li>
        <li
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            cursor: "grab",
          }}
        >
          Task 2
        </li>
        <li
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            cursor: "grab",
          }}
        >
          Task 3
        </li>
      </ul>
    </div>
  );
};

export default DragDropUI;
