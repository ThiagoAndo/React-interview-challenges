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
import React, { useReducer, useEffect, useRef, useState } from "react";
import styles from "./CRUDperations.module.css";
const useFetch = () => {
  const fetchData = async (url, headers = {}) => {
    try {
      const resp = await fetch(url, { ...headers });
      if (!resp.ok)
        throw new Error(
          "Could not retrive data from server, please try again latter."
        );

      const resData = await resp.json();
      return { err: null, data: resData };
    } catch (e) {
      return { err: e.message, data: [] };
    }
  };
  return { fetchData };
};
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { error: null, items: [], isLoading: true };
    case "RESP":
      return { error: null, isLoading: false, items: action.items };
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
  const [reRender, setReRender] = useState(0);
  const [edit, setEdite] = useState({
    isEditing: false,
    item: { id: null, name: "" },
  });
  const { fetchData } = useFetch();
  const itemRef = useRef(null);

  const hanldePost = async () => {
    let thisMethod = "POST";
    let url = "http://localhost:8080/items";
    if (edit.isEditing) {
      thisMethod = "PUT";
      url = `http://localhost:8080/items/${edit.item.id}`;
    }

    const post = {
      method: thisMethod,
      body: JSON.stringify({ name: itemRef.current.value }),
      headers: { "Content-Type": "application/json" },
    };
    const ret = await fetchData(url, post);
    if (ret.err) {
      dispatch({ type: "ERROR", e: ret.err });
    } else {
      if (edit.isEditing) {
        setEdite({ isEditing: false, item: { id: null, name: "" } });
      } else {
        itemRef.current.value = "";
      }
      setReRender(reRender + 1);
    }
  };

  const handleDelete = async (id) => {
    const post = {
      method: "DELETE",
    };
    const ret = await fetchData(`http://localhost:8080/items/${id}`, post);
    if (ret.err) {
      dispatch({ type: "ERROR", e: ret.err });
    } else {
      setReRender(reRender + 1);
    }
  };

  useEffect(() => {
    dispatch({ type: "LOADING" });
    const getData = async () => {
      const ret = await fetchData("http://localhost:8080/items", null);

      if (ret.err) {
        dispatch({ type: "ERROR", e: ret.err });
      } else {
        dispatch({ type: "RESP", items: ret.data.reverse() });
      }
    };
    getData();
  }, [reRender]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CRUD Operations</h1>
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter item name"
          className={styles.inputField}
          ref={itemRef}
          defaultValue={edit.item.name}
        />
        <button className={styles.addButton} onClick={hanldePost}>
          {edit.isEditing ? "Update" : "Add Item"}
        </button>
      </div>
      <ul className={styles.list}>
        {state.isLoading ? (
          <li className={styles.loading}>Loading data ...</li>
        ) : null}
        {state.error ? <li className={styles.error}>{state.error}</li> : null}
        {state.items.length > 0
          ? state.items.map((item) => (
              <li key={item.id} className={styles.listItem}>
                <span className={styles.itemText}>
                  {edit.isEditing && item.id === edit.item.id ? (
                    <span className={styles.editing}>Editing content</span>
                  ) : (
                    item.name
                  )}
                </span>
                {edit.isEditing && item.id === edit.item.id ? null : (
                  <div className={styles.actionButton}>
                    <button
                      className={styles.actionButton + " " + styles.editButton}
                      onClick={() => {
                        setEdite({
                          isEditing: true,
                          item: { id: item.id, name: item.name },
                        });
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={
                        styles.actionButton + " " + styles.deleteButton
                      }
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};


// const CRUDAppUI = () => {
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>CRUD Operations</h1>
//       <div className={styles.inputGroup}>
//         <input
//           type="text"
//           placeholder="Enter item name"
//           className={styles.inputField}
//         />
//         <button className={styles.addButton}>Add Item</button>
//       </div>
//       <ul className={styles.list}>
//         <li className={styles.loading}>Loading data ...</li>
//         <li className={styles.error}>Error message here</li>
//         <li className={styles.listItem}>
//           <span className={styles.itemText}>Item Name</span>
//           <div className={styles.actionButton}>
//             <button className={styles.actionButton + " " + styles.editButton}>
//               Edit
//             </button>
//             <button className={styles.actionButton + " " + styles.deleteButton}>
//               Delete
//             </button>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };
export default CRUDAppUI;
