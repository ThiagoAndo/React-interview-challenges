import React, { useReducer, useEffect, useRef, useState } from "react";
import styles from "./CRUDperations.module.css";

const useFetch = () => {
  const fetchData = async (url, options = {}) => {
    try {
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error("Could not retrieve data from the server.");
      const data = await resp.json();
      return { err: null, data };
    } catch (e) {
      return { err: e.message, data: [] };
    }
  };
  return { fetchData };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "RESP":
      return { ...state, isLoading: false, items: action.items };
    case "ERROR":
      return { ...state, isLoading: false, error: action.error };
    case "MESSAGE":
      return { ...state, successMessage: action.message };
    default:
      return state;
  }
};

const initialState = {
  isLoading: false,
  error: null,
  items: [],
  successMessage: "",
};

const CRUDAppUI = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState("");
  const [edit, setEdit] = useState({
    isEditing: false,
    item: { id: null, name: "" },
  });
  const { fetchData } = useFetch();

  const handlePost = async () => {
    const url = edit.isEditing
      ? `http://localhost:8080/items/${edit.item.id}`
      : "http://localhost:8080/items";
    const method = edit.isEditing ? "PUT" : "POST";

    const options = {
      method,
      body: JSON.stringify({ name: inputValue }),
      headers: { "Content-Type": "application/json" },
    };

    const ret = await fetchData(url, options);
    if (ret.err) {
      dispatch({ type: "ERROR", error: ret.err });
    } else {
      dispatch({
        type: "MESSAGE",
        message: edit.isEditing
          ? "Item updated successfully!"
          : "Item added successfully!",
      });
      setEdit({ isEditing: false, item: { id: null, name: "" } });
      setInputValue("");
      fetchItems();
    }
  };

  const handleDelete = async (id) => {
    const ret = await fetchData(`http://localhost:8080/items/${id}`, {
      method: "DELETE",
    });
    if (ret.err) {
      dispatch({ type: "ERROR", error: ret.err });
    } else {
      dispatch({ type: "MESSAGE", message: "Item deleted successfully!" });
      fetchItems();
    }
  };

  const fetchItems = async () => {
    dispatch({ type: "LOADING" });
    const ret = await fetchData("http://localhost:8080/items");
    if (ret.err) {
      dispatch({ type: "ERROR", error: ret.err });
    } else {
      dispatch({ type: "RESP", items: ret.data.reverse() });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    if (state.successMessage) {
      const timer = setTimeout(() => {
        dispatch({ type: "MESSAGE", message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state.successMessage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>CRUD Operations</h1>
      {state.successMessage && (
        <p className={styles.success}>{state.successMessage}</p>
      )}
      {state.error && <p className={styles.error}>{state.error}</p>}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter item name"
          className={styles.inputField}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button className={styles.addButton} onClick={handlePost}>
          {edit.isEditing ? "Update" : "Add Item"}
        </button>
      </div>
      <ul className={styles.list}>
        {state.isLoading && <li className={styles.loading}>Loading data...</li>}
        {state.items.map((item) => (
          <li key={item.id} className={styles.listItem}>
            <span className={styles.itemText}>{item.name}</span>
            <div className={styles.actionButtons}>
              <button
                className={`${styles.actionButton} ${styles.editButton}`}
                onClick={() => {
                  setEdit({ isEditing: true, item });
                  setInputValue(item.name);
                }}
              >
                Edit
              </button>
              <button
                className={`${styles.actionButton} ${styles.deleteButton}`}
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CRUDAppUI;
_