import React from "react";
// Search and Filter Challenge:
/**
State Management:

Add state variables to manage the search term, selected category, and the list of items to display.
Use the useState hook to manage these states.
Dynamic Filtering Logic:

Write a function that dynamically filters the list of items based on the search term and selected category.
Update the displayed list whenever the search input or category dropdown changes.
Initial Item List:

Create a hardcoded array of items to represent your dataset. Each item should have a name and a category.
Search Input:

Add an onChange event listener to the search input to update the search term state.
Convert the input to lowercase for case-insensitive search.
Category Dropdown:

Add an onChange event listener to the dropdown to update the selected category state.
Filtered List Display:

Use Array.prototype.filter to create a filtered list based on the search term and selected category.
Render the filtered items dynamically in the <ul>.
Clear Filters Button (Bonus):

Add a button that resets the search term and category states, restoring the initial list.
 */
const SearchFilterUI = () => {
  const items = [
    { id: 1, name: "Item 1", category: "category1" },
    { id: 2, name: "Item 2", category: "category2" },
    { id: 3, name: "Item 3", category: "category1" },
    { id: 4, name: "Item 4", category: "category2" },
  ];

  return (
    <div
      style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}
    >
      <h1>Search and Filter</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search items..."
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <select
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="all">All Categories</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
            borderRadius: "5px",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
          }}
        >
          Item 1 - Category 1
        </li>
        <li
          style={{
            padding: "10px",
            border: "1px solid #ddd",
            marginBottom: "10px",
            borderRadius: "5px",
            textAlign: "left",
            backgroundColor: "#f9f9f9",
          }}
        >
          Item 2 - Category 2
        </li>
      </ul>
    </div>
  );
};

export default SearchFilterUI;
