import React, { useState, useReducer, useEffect } from "react";

// Initial state for the reducer
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};

// Reducer function to manage state transitions
const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, isLoading: true, error: null };
    case "OK":
      return { ...state, isLoading: false, data: action.data, error: null };
    case "ERROR":
      return { ...state, isLoading: false, error: action.error };
    default:
      return state;
  }
};

// Custom hook for fetching data
const useFetch = (headers = {}, url) => {
  const fetchData = async () => {
    try {
      const response = await fetch(url, headers);
      if (!response.ok) {
        throw new Error(
          "Could not fetch data from server. Please try again later."
        );
      }
      const resData = await response.json();
      return { error: null, data: resData };
    } catch (err) {
      return { error: err.message, data: [] };
    }
  };

  return { fetchData };
};

// Pagination UI Component
const PaginationUI = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pagination, setPagination] = useState(1);

  const itemsPerPage = 10; // Number of items per page
  const totalPages = Math.ceil(state.data.length / itemsPerPage); // Total number of pages

  const { fetchData } = useFetch(
    null,
    "https://jsonplaceholder.typicode.com/posts"
  );

  useEffect(() => {
    const handleFetch = async () => {
      dispatch({ type: "LOADING" });
      const { error, data } = await fetchData();

      if (error) {
        dispatch({ type: "ERROR", error });
      } else {
        dispatch({ type: "OK", data });
      }
    };

    handleFetch();
  }, []);

  // Compute items for the current page
  const currentPageItems = state.data.slice(
    (pagination - 1) * itemsPerPage,
    pagination * itemsPerPage
  );

  // Handlers for pagination
  const handlePrevious = () => pagination > 1 && setPagination(pagination - 1);
  const handleNext = () =>   pagination < totalPages && setPagination(pagination + 1);
  const handlePageClick = (num) => setPagination(num);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ color: "#333" }}>Paginated List</h1>

      {state.isLoading && <p style={{ color: "#555" }}>Loading...</p>}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}

      {!state.isLoading && !state.error && (
        <>
          <ul
            style={{
              display: "flex",
              flexBasis: "row",
              listStyle: "none",
              padding: 0,
              margin: "0 auto",
              gap:"1rem",
              flexWrap:"wrap"
            }}
          >
            {currentPageItems.map((item) => (
              <li
                key={item.id}
                style={{
                  width: "200px",
                  padding: "10px",
                  margin: "5px 0",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  background: "#f9f9f9",
                }}
              >
                {item.body}
              </li>
            ))}
          </ul>

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: pagination === 1 ? "#ddd" : "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: pagination === 1 ? "not-allowed" : "pointer",
              }}
              disabled={pagination === 1}
              onClick={handlePrevious}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                style={{
                  padding: "10px 20px",
                  backgroundColor:
                    pagination === index + 1 ? "#007BFF" : "#f1f1f1",
                  color: pagination === index + 1 ? "#fff" : "#333",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handlePageClick(index + 1)}
                aria-label={`Go to page ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}

            <button
              style={{
                padding: "10px 20px",
                backgroundColor: pagination === totalPages ? "#ddd" : "#007BFF",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: pagination === totalPages ? "not-allowed" : "pointer",
              }}
              disabled={pagination === totalPages}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationUI;
