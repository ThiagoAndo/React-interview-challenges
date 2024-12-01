// Challenge: Build a UI for fetching and displaying data with the following requirements:
// 1. A button to "Fetch Data" (no logic required).
// 2. A placeholder list of items with a title and description.
// 3. Basic styling for layout and appearance.
// https://jsonplaceholder.typicode.com/posts
//   throw new Error(`HTTP error! Status: ${response.status}`);

import { useState } from "react";

const FecthJsonPlaceholder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setErr(false);
    setData([]);
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!resp.ok) {
        throw new Error(
          "Could not retrive data from server, check URL address"
        );
      }
      const respData = await resp.json();
      setData(respData.slice(0, 5));
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Data Fetch Example</h2>
      {err && <h3 style={{ color: "red" }}>{err}</h3>}

      {/* Button to fetch data (placeholder, no logic) */}
      <button
        style={{ padding: "10px", marginBottom: "20px" }}
        onClick={fetchData}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      {/* Placeholder for data items */}
      <ul style={{ listStyleType: "none", padding: "0" }}>
        {!data.length > 0 ? (
          <li>Press Fetch</li>
        ) : (
          data.map((item) => (
            <li
              key={item.id}
              style={{ padding: "10px", borderBottom: "1px solid #ccc" }}
            >
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default FecthJsonPlaceholder;

// Challenge: Build a UI for fetching and displaying data with the following requirements:
// 1. A button to "Fetch Data" (no logic required).
// 2. A placeholder list of items with a title and description.
// 3. Basic styling for layout and appearance.
// https://jsonplaceholder.typicode.com/posts
//   throw new Error(`HTTP error! Status: ${response.status}`);

import React from "react";

// const FecthJsonPlaceholder = () => {
//   return (
//     <div style={{ textAlign: "center", padding: "20px" }}>
//       <h2>Data Fetch Example</h2>

//       {/* Button to fetch data (placeholder, no logic) */}
//       <button style={{ padding: "10px", marginBottom: "20px" }}>
//         Fetch Data
//       </button>

//       {/* Placeholder for data items */}
//       <ul style={{ listStyleType: "none", padding: "0" }}>
//         <li style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//           <h3>Sample Title 1</h3>
//           <p>Sample description for item 1.</p>
//         </li>
//         <li style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//           <h3>Sample Title 2</h3>
//           <p>Sample description for item 2.</p>
//         </li>
//         <li style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
//           <h3>Sample Title 3</h3>
//           <p>Sample description for item 3.</p>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default FecthJsonPlaceholder;
