import React, { useState, useEffect } from "react";

const PaginationUI = () => {
  // State to hold the list of posts fetched from the API
  const [posts, setPosts] = useState([]);
  // State to track the current page number, initialized to the first page
  const [currentPage, setCurrentPage] = useState(1);
  // Constant defining the number of items to display per page
  const itemsPerPage = 10;

  // useEffect hook to fetch posts from the API when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch posts
    const fetchPosts = async () => {
      try {
        // Fetch data from the JSONPlaceholder API
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        // Parse the JSON response
        const data = await response.json();
        // Update the 'posts' state with the fetched data
        setPosts(data);
      } catch (error) {
        // Log any errors that occur during the fetch operation
        console.error("Error fetching posts:", error);
      }
    };

    // Invoke the fetchPosts function
    fetchPosts();
  }, []); // Empty dependency array ensures this effect runs only once after the initial render
  ç;
  // Calculate the index of the last post on the current page
  const indexOfLastPost = currentPage * itemsPerPage;

  // Calculate the index of the first post on the current page
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  // Slice the 'posts' array to get only the posts for the current page
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Calculate the total number of pages required
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  // Generate an array of page numbers for rendering pagination buttons
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  // Function to handle the "Next" button click
  const handleNext = () => {
    // Increment the current page number if it's less than the total number of pages
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Function to handle the "Previous" button click
  const handlePrevious = () => {
    // Decrement the current page number if it's greater than 1
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Function to handle clicking on a specific page number
  const handlePageClick = (pageNumber) => {
    // Set the current page to the selected page number
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Paginated List</h1>
      {/* Display the list of posts for the current page */}
      <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: "400px" }}>
        {currentPosts.map((post) => (
          // Each list item displays the title of a post
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      {/* Pagination controls */}
      <div style={{ marginTop: "20px" }}>
        {/* "Previous" button */}
        <button
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            cursor: "pointer",
          }}
          onClick={handlePrevious}
          // Disable the button if on the first page
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {/* Page number buttons */}
        {pageNumbers.map((number) => (
          <button
            key={number}
            style={{
              padding: "10px 20px",
              margin: "0 5px",
              cursor: "pointer",
              // Bold the button text if it's the current page
              fontWeight: currentPage === number ? "bold" : "normal",
            }}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </button>
        ))}
        {/* "Next" button */}
        <button
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            cursor: "pointer",
          }}
          onClick={handleNext}
          // Disable the button if on the last page
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationUI;
