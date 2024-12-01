import { useState } from "react";

const FetchJsonPlaceholder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setErr("");
    setData([]);
    try {
      const resp = await fetch("https://jsonplaceholder.typicode.com/posts");
      if (!resp.ok) {
        throw new Error(
          "Could not retrieve data from server, please check the URL."
        );
      }
      const respData = await resp.json();
      setData(respData.slice(0, 5)); // Limit to 5 items for display
    } catch (error) {
      setErr(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Data Fetch Example</h2>

      {err && <h3 style={{ color: "red", marginBottom: "20px" }}>{err}</h3>}

      <button
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: loading ? "#ddd" : "#007BFF",
          color: loading ? "#555" : "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        onClick={fetchData}
        disabled={loading}
      >
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      <ul style={{ listStyleType: "none", padding: 0 }}>
        {loading && <li>Loading data...</li>}

        {!loading && data.length === 0 && !err && (
          <li style={{ fontStyle: "italic", color: "#666" }}>
            No data available. Press "Fetch Data" to load posts.
          </li>
        )}

        {data.map((item) => (
          <li
            key={item.id}
            style={{
              padding: "15px",
              margin: "10px auto",
              border: "1px solid #ddd",
              borderRadius: "5px",
              maxWidth: "500px",
              backgroundColor: "#f9f9f9",
              textAlign: "left",
            }}
          >
            <h3 style={{ margin: "0 0 10px" }}>{item.title}</h3>
            <p style={{ margin: 0 }}>{item.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchJsonPlaceholder;
