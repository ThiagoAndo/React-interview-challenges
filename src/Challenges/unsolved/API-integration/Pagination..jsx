import React, { useState, useEffect } from "react";
const PaginationUI = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  const indexOfLastPost = currentPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
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
