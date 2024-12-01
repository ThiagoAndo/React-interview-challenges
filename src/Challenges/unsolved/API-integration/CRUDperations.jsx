import React, { useState, useEffect, useRef } from "react";

// Utility for API calls to centralize fetch logic
// This avoids repetitive `try-catch` blocks for each API operation.
const apiCall = async (url, options) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Unknown error occurred");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};

// Delete Component: Handles item deletion
const Delete = ({ id, callback, errCallback }) => {
  const deleteItem = async () => {
    try {
      // API call to delete an item
      await apiCall(`http://localhost:8080/items/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      callback({
        changed: true,
        message: "Item deleted successfully!",
      });
    } catch (err) {
      // Pass error message to the parent
      errCallback(err.message);
    }
  };

  return (
    <button
      style={{
        padding: "5px 10px",
        backgroundColor: "#DC3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        fontSize: "14px",
        cursor: "pointer",
      }}
      onClick={deleteItem}
    >
      Delete
    </button>
  );
};

// AddItem Component: Handles adding new items
const AddItem = ({ callbackProp, err }) => {
  const itemRef = useRef(null);

  const createItem = async (data) => {
    if (!data.name.trim()) {
      // Added validation to prevent empty submissions
      err("Item name cannot be empty");
      return;
    }
    try {
      // API call to add a new item
      await apiCall("http://localhost:8080/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      callbackProp({
        changed: true,
        message: "Item added successfully!",
      });
    } catch (error) {
      // Pass error message to the parent
      err(error.message);
    } finally {
      // Clear the input field after submission
      itemRef.current.value = "";
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        ref={itemRef}
        type="text"
        placeholder="Enter item name"
        style={{
          flex: 1,
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "16px",
        }}
      />
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => createItem({ name: itemRef.current.value })}
      >
        Add Item
      </button>
    </div>
  );
};

// ChangeItem Component: Handles editing and updating items
const ChangeItem = ({ item, callbackProp, err }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(item.name);

  const updateItem = async () => {
    if (!newName.trim()) {
      // Added validation to prevent empty updates
      err("Item name cannot be empty");
      return;
    }
    try {
      // API call to update the item
      await apiCall(`http://localhost:8080/items/${item.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      callbackProp({
        changed: true,
        message: "Item updated successfully!",
      });
      // Exit editing mode after successful update
      setIsEditing(false);
    } catch (error) {
      // Pass error message to the parent
      err(error.message);
    }
  };

  return (
    <li
      key={item.id}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        marginBottom: "10px",
        border: "1px solid #ddd",
        borderRadius: "4px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      {!isEditing ? (
        // Display item name when not editing
        <span style={{ fontSize: "16px", color: "#333" }}>{item.name}</span>
      ) : (
        // Editable input when in editing mode
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          style={{
            flex: 1,
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            fontSize: "16px",
          }}
        />
      )}
      <div>
        <button
          onClick={() => (isEditing ? updateItem() : setIsEditing(true))}
          style={{
            padding: "5px 10px",
            marginRight: "5px",
            backgroundColor: isEditing ? "#28A745" : "#FFC107",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          {isEditing ? "Update" : "Edit"}
        </button>
        {!isEditing && (
          <Delete id={item.id} callback={callbackProp} errCallback={err} />
        )}
      </div>
    </li>
  );
};

// Main CRUDAppUI Component
const CRUDAppUI = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ changed: false, message: "" });

  // Fetch data from server
  const fetchData = async () => {
    setLoading(true);
    try {
      // API call to get all items
      const items = await apiCall("http://localhost:8080/items", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setData(items.reverse()); // Reverse items to show the latest first
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data initially and after every change
  useEffect(() => {
    fetchData();
  }, [status]);

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#333",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        CRUD Operations
      </h1>
      {/* AddItem Component */}
      <AddItem callbackProp={setStatus} err={setError} />
      {/* Success Message */}
      {status.changed && (
        <p style={{ color: "green", textAlign: "center" }}>{status.message}</p>
      )}
      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {/* Loading Indicator */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {/* List of items */}
          {data.length > 0 ? (
            data.map((item) => (
              <ChangeItem
                key={item.id}
                item={item}
                callbackProp={setStatus}
                err={setError}
              />
            ))
          ) : (
            <p style={{ textAlign: "center" }}>No items available</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default CRUDAppUI;

// import React from "react";

// const CRUDAppUI = () => {
//   // CRUD Operations Challenge:
//   /**
// 1. Set Up State Management
// Use useState to manage:
// The list of items.
// The current value of the input field (for creating and updating items).
// A selected item to edit (if any).
// A success message to display for user feedback.

// 2. Create Operation
// Add functionality to the "Add Item" button:
// Take the value from the input field.
// Append it to the list of items in state.
// Clear the input field after adding.
// Display a success message (e.g., "Item added successfully!").

// 3. Read Operation
// Render the current list of items dynamically using .map() in the <ul> tag.

// 4. Update Operation
// Add an "Edit" button next to each item:
// Clicking it should populate the input field with the selected item's value.
// Replace the item in the list when the user submits the changes.
// Show a success message (e.g., "Item updated successfully!").
// Bonus: Use a modal for editing instead of inline editing.

// 5. Delete Operation
// Add a "Delete" button next to each item:
// Clicking it should remove the item from the list.
// Show a success message (e.g., "Item deleted successfully!").

// 6. Display Success Messages
// After any operation, show a brief success message.
// Use setTimeout to clear the message after a few seconds.

// 7. Styling and Enhancements
// Ensure the UI is visually appealing (e.g., add hover effects to buttons).
// Use a modal library (or create a simple modal component) for the "Edit" form.
//    */

//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h1>CRUD Operations</h1>
//       <div style={{ marginBottom: "20px" }}>
//         <input
//           type="text"
//           placeholder="Enter item name"
//           style={{
//             padding: "10px",
//             marginRight: "10px",
//             border: "1px solid #ddd",
//             borderRadius: "5px",
//           }}
//         />
//         <button style={{ padding: "10px 20px", cursor: "pointer" }}>
//           Add Item
//         </button>
//       </div>
//       <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
//         <li>
//           Item 1 <button style={{ marginLeft: "10px" }}>Edit</button>{" "}
//           <button>Delete</button>
//         </li>
//         <li>
//           Item 2 <button style={{ marginLeft: "10px" }}>Edit</button>{" "}
//           <button>Delete</button>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default CRUDAppUI;
