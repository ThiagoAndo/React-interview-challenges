// Challenge: Create a basic Search Filter UI with the following requirements:
// 1. Display a list of sample items.
// 2. Include an input field for users to type a search query.
// 3. Style the UI for a clean and simple look.

// What Should Be Returned from the Search?
// In a full implementation of the Search Filter, the search input should dynamically filter the list of items based on the user's input. Here’s what you should aim for:

// Filtered List of Items:
// The component should display only the items that include the user’s search query (case-insensitive).
// For example, if the user types "ap", the list should show "Apple" and "Grapes" because both contain "ap".
// Example Output:
// Initial List:

// mathematica
// Copy code
// Apple, Banana, Orange, Mango, Grapes
// User Input: "ap"

// Filtered List:

// Copy code
// Apple, Grapes
// User Input: "m"

// Filtered List:

const fruits = ["Apple", "Banana", "Orange", "Mango", "Grapes"];
const SearchFilterUI = () => {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ fontSize: "24px", marginBottom: "20px", color: "#333" }}>
        Search & Filter
      </h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search..."
          style={{
            width: "calc(100% - 140px)",
            padding: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            marginRight: "10px",
          }}
        />
        <select
          style={{
            padding: "10px",
            width: "120px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        >
          <option value="all">All</option>
          <option value="category1">Category 1</option>
          <option value="category2">Category 2</option>
        </select>
      </div>
      <ul style={{ listStyleType: "none", padding: "0" }}>
        <li
          style={{
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            textAlign: "left",
          }}
        >
          Item 1 - Category 1
        </li>
        <li
          style={{
            padding: "15px",
            marginBottom: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            textAlign: "left",
          }}
        >
          Item 2 - Category 2
        </li>
      </ul>
    </div>
  );
};

export default SearchFilterUI;
