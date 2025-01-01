import { useState, useRef, useEffect } from "react";
const RefPrevState = () => {
  const [count, setCount] = useState(0);
  const prevCount = useRef(0); // Store the previous value of count

  useEffect(() => {
    // When useEffect runs, it updates the prevCount.current value to the current count. However:
    // During the current render, prevCount.current still holds the value from the previous render because useEffect hasn’t run yet.
    // The new value for prevCount.current is only updated after the render is complete, but that updated value will not be visible until the next render.
    // Thus:

    // The value of count in the useEffect callback is always the current value for the render in which the useEffect was scheduled.
    // prevCount.current reflects the previous value because it hasn’t been updated yet (since the useEffect callback hasn’t executed yet).

    prevCount.current = count; // Update the ref after every render
  });

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useRef Previous State Example</h1>
      <p>Current Count: {count}</p>
      <p>Previous Count: {prevCount.current}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
    </div>
  );
};

export default RefPrevState;
