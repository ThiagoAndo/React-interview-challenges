import React, { useState, useDeferredValue } from "react";

const DeferredExample = () => {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useDeferredValue Example</h1>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <p>Deferred Search: {deferredSearch}</p>
    </div>
  );
};

export default DeferredExample;

/**
 * When to use:
 * - Use useDeferredValue for delaying non-critical updates (e.g., filtering large lists).
 * - Avoid using it for real-time updates requiring immediate feedback.
 */
