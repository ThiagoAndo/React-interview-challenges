import  { useState, memo, useMemo } from "react";

// Memoized component to prevent re-renders if props haven't changed
const Counter = memo(({ count }) => {
  console.log("Counter component rendered");
  return <p>Count: {count}</p>;
});

// Parent component
const MemoExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  return (
    <div style={{ textAlign: "center" }}>
      <h1>React.memo Example</h1>
      <Counter count={count} />{" "}
      {/* Counter only re-renders when count changes */}
      <button onClick={() => setCount((prev) => prev + 1)}>Increment</button>
      <input
        type="text"
        placeholder="Type here"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ marginLeft: "10px" }}
      />
    </div>
  );
};

// Component with expensive calculation
const ExpensiveCalculation = () => {
  const [num, setNum] = useState(0);

  // Memoize the result to avoid recalculating unless num changes
  const factorialOf = (n) => (n <= 1 ? 1 : n * factorialOf(n - 1));

  
  const factorial = useMemo(() => {
    console.log("Calculating factorial...");
    return num <= 0 ? 1 : num * factorialOf(num - 1);
  }, [num]);


  return (
    <div style={{ textAlign: "center" }}>
      <h1>useMemo Example</h1>
      <input
        type="number"
        value={num}
        onChange={(e) => setNum(parseInt(e.target.value) || 0)}
        style={{ marginBottom: "10px" }}
      />
      <p>Factorial: {factorial}</p>
    </div>
  );
};

export default ExpensiveCalculation;

/**
 * When to use:
 * - Use useMemo for expensive calculations to prevent recalculating on every render.
 * - Avoid using it for trivial computations as it adds complexity.
 */

// export default MemoExample;

/**
 * When to use:
 * - Use React.memo for functional components that receive props and have expensive rendering logic.
 * - Avoid using React.memo if your component re-renders quickly or always needs fresh data.
 */
