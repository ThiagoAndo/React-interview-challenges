import React, { useReducer, useEffect, useRef } from "react";
// CRUD Operations Challenge:
/**
1. Set Up State Management
Use useState to manage:
The list of items.
The current value of the input field (for creating and updating items).
A selected item to edit (if any).
A success message to display for user feedback.

2. Create Operation
Add functionality to the "Add Item" button:
Take the value from the input field.
Append it to the list of items in state.
Clear the input field after adding.
Display a success message (e.g., "Item added successfully!").

3. Read Operation
Render the current list of items dynamically using .map() in the <ul> tag.

4. Update Operation
Add an "Edit" button next to each item:
Clicking it should populate the input field with the selected item's value.
Replace the item in the list when the user submits the changes.
Show a success message (e.g., "Item updated successfully!").
Bonus: Use a modal for editing instead of inline editing.

5. Delete Operation
Add a "Delete" button next to each item:
Clicking it should remove the item from the list.
Show a success message (e.g., "Item deleted successfully!").

6. Display Success Messages
After any operation, show a brief success message.
Use setTimeout to clear the message after a few seconds.

7. Styling and Enhancements
Ensure the UI is visually appealing (e.g., add hover effects to buttons).
Use a modal library (or create a simple modal component) for the "Edit" form.
   */

const useFetch = () => {
  const fetchData = async (url, headers = {}) => {
    try {
      const resp = await fetch(url, headers);
      if (!resp.ok)
        throw new Error(
          "Could not retrive data from server, please try again latter."
        );

      const resData = await resp.json();
      return { err: null, data: resData };
    } catch (e) {
      return { err: e.message, data: resData };
    }
  };
  return { fetchData };
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true };
    case "RESP":
      return { ...state, isLoading: false, items: action.items };
    case "ERROR":
      return { error: action.e, isLoading: false, items: [] };
  }
};

const initialState = {
  isLoading: false,
  error: null,
  items: [],
};
const CRUDAppUI = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchData } = useFetch();

  useEffect(() => {
    const getData = async () => {
      const ret = await fetchData("http://localhost:8080/items", null);
      if (ret.err) {
        dispatch({ type: "ERROR", e: ret.err });
      } else {
        dispatch({ type: "RESP", items: ret.data });
      }
    };
    getData()
  }, []);

  console.log(state.items)

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>CRUD Operations</h1>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter item name"
          style={{
            padding: "10px",
            marginRight: "10px",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <button style={{ padding: "10px 20px", cursor: "pointer" }}>
          Add Item
        </button>
      </div>
      <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
        {state.items.length > 0
          ? state.items.map((item) => (
              <li key={item.id}>
                {item.name} <button style={{ marginLeft: "10px" }}>Edit</button>
                <button>Delete</button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default CRUDAppUI;
