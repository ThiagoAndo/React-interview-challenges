import React, { useState, useEffect, useReducer } from "react";
import styles from "./Pagination.module.css";

// const PaginationUI = () => {
//   // State to hold the list of posts fetched from the API
//   const [posts, setPosts] = useState([]);
//   // State to track the current page number, initialized to the first page
//   const [currentPage, setCurrentPage] = useState(1);
//   // Constant defining the number of items to display per page
//   const itemsPerPage = 10;

//   // useEffect hook to fetch posts from the API when the component mounts
//   useEffect(() => {
//     // Asynchronous function to fetch posts
//     const fetchPosts = async () => {
//       try {
//         // Fetch data from the JSONPlaceholder API
//         const response = await fetch(
//           "https://jsonplaceholder.typicode.com/posts"
//         );
//         // Parse the JSON response
//         const data = await response.json();
//         // Update the 'posts' state with the fetched data
//         setPosts(data);
//       } catch (error) {
//         // Log any errors that occur during the fetch operation
//         console.error("Error fetching posts:", error);
//       }
//     };

//     // Invoke the fetchPosts function
//     fetchPosts();
//   }, []); // Empty dependency array ensures this effect runs only once after the initial render

//   // Calculate the index of the last post on the current page
//   const indexOfLastPost = currentPage * itemsPerPage;

//   // Calculate the index of the first post on the current page
//   const indexOfFirstPost = indexOfLastPost - itemsPerPage;
//   // Slice the 'posts' array to get only the posts for the current page
//   const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

//   // Calculate the total number of pages required
//   const totalPages = Math.ceil(posts.length / itemsPerPage);

//   // Generate an array of page numbers for rendering pagination buttons
//   const pageNumbers = Array.from(
//     { length: totalPages },
//     (_, index) => index + 1
//   );
//   // Function to handle the "Next" button click
//   const handleNext = () => {
//     // Increment the current page number if it's less than the total number of pages
//     if (currentPage < totalPages) {
//       setCurrentPage((prevPage) => prevPage + 1);
//     }
//   };

//   // Function to handle the "Previous" button click
//   const handlePrevious = () => {
//     // Decrement the current page number if it's greater than 1
//     if (currentPage > 1) {
//       setCurrentPage((prevPage) => prevPage - 1);
//     }
//   };

//   // Function to handle clicking on a specific page number
//   const handlePageClick = (pageNumber) => {
//     // Set the current page to the selected page number
//     setCurrentPage(pageNumber);
//   };

//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Paginated List</h1>
//       {/* Display the list of posts for the current page */}
//       <ul className={styles.list}>
//         {currentPosts.map((post) => (
//           // Each list item displays the title of a post
//           <li key={post.id}>{post.title}</li>
//         ))}
//       </ul>
//       {/* Pagination controls */}
//       <div className={styles.paginationControls}>
//         {/* "Previous" button */}
//         <button
//           className={styles.paginationButton}
//           onClick={handlePrevious}
//           // Disable the button if on the first page
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {/* Page number buttons */}
//         {pageNumbers.map((number) => (
//           <button
//             className={`${styles.paginationButton} ${styles.active}`}
//             onClick={() => handlePageClick(number)}
//           >
//             {number}
//           </button>
//         ))}
//         {/* "Next" button */}
//         <button
//           className={styles.paginationButton}
//           onClick={handleNext}
//           // Disable the button if on the last page
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

//"https://jsonplaceholder.typicode.com/posts"

const Spinner = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "ERROR":
      return { error: action.e, loading: false, data: [] };
    case "OK":
      return { ...state, loading: false, data: action.data };
    default:
      return state;
  }
};
const initialState = {
  loading: false,
  error: null,
  data: [],
};
const PaginationUI = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [pageNum, setPageNum] = useState(1);

  const itemsPerPage = 10;
  const lastIndex = pageNum * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const items = state.data.slice(firstIndex, lastIndex);
  const pageControlTotal = Math.ceil(state.data.length / itemsPerPage);

  const pageControl = Array.from(
    { length: pageControlTotal },
    (_, index) => index + 1
  );
  const handleNext = () => setPageNum((prev) => prev + 1);
  const handlePrevious = () => setPageNum((prev) => prev - 1);
  const handlePageNum = (num) => setPageNum(num);

  console.log("firstIndex");
  console.log(firstIndex);
  console.log("lastIndex");
  console.log(lastIndex);

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "LOADING" });
      await new Promise((resolve) => setTimeout(resolve, 1500)); //Added delay to render load state
      try {
        const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
        if (!resp.ok)
          throw new Error(
            "Could not retrive data from server. Try again latter."
          );
        const respData = await resp.json();
        dispatch({ type: "OK", data: respData });
      } catch (err) {
        dispatch({ type: "ERROR", e: err.message || "Something went wrong!" });
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Paginated List</h1>
      {/* Display list */}
      <ul className={styles.list}>
        {state.loading && <Spinner />}
        {items.length > 0 &&
          items.map((item) => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
      </ul>
      {/* Pagination controls */}
      {!state.error ? (
        <div className={styles.paginationControls}>
          <button
            className={styles.paginationButton}
            disabled={pageNum === 1}
            onClick={handlePrevious}
          >
            Previous
          </button>
          {pageControl.map((btn, i) => (
            <button
              key={btn}
              className={`${styles.paginationButton} ${styles.active}`}
              onClick={() => handlePageNum(i + 1)}
            >
              {btn}
            </button>
          ))}

          <button
            className={styles.paginationButton}
            disabled={pageNum === pageControl.length}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      ) : (
        <h2 className={styles.error}>{state.error}</h2>
      )}
    </div>
  );
};
export default PaginationUI;
