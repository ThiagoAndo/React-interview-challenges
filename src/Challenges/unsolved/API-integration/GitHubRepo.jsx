import React from "react";

const GitHubRepoSearchUI = () => {
  // GitHub Repo Search Challenge:
  /**
   * 1. Build a GitHub Repo Search UI with:
   *    - A search input for entering a query term.
   *    - A button to initiate the search.
   *    - A display area to show repository details, such as:
   *      - Repository name
   *      - Description
   *      - Stars count
   *      - Link to the repository.
   * 2. Add placeholders for loading and error states.
   */

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>GitHub Repo Search</h1>
      <input
        type="text"
        placeholder="Search for repositories..."
        style={{
          padding: "10px",
          marginRight: "10px",
          border: "1px solid #ddd",
          borderRadius: "5px",
        }}
      />
      <button
        style={{ padding: "10px 20px", borderRadius: "5px", cursor: "pointer" }}
      >
        Search
      </button>
      <div style={{ marginTop: "20px" }}>
        <p>Search results will appear here...</p>
      </div>
    </div>
  );
};

export default GitHubRepoSearchUI;
