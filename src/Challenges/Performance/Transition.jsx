import React, { useState, useTransition } from "react";

const TransitionExample = () => {
  const [isPending, startTransition] = useTransition();
  const [list, setList] = useState([]);

  const generateList = () => {
    startTransition(() => {
      setList(Array.from({ length: 10000 }, (_, i) => `Item ${i}`));
    });
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useTransition Example</h1>
      <button onClick={generateList}>Generate List</button>
      {isPending ? (
        <p>Loading...</p>
      ) : (
        list.map((item) => <p key={item}>{item}</p>)
      )}
    </div>
  );
};

export default TransitionExample;

/**
 * When to use:
 * - Use useTransition for deferring non-urgent updates to improve user experience.
 * - Avoid using it for small-scale updates that don't impact rendering performance.
 */
