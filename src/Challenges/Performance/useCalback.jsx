import React, { useState, useCallback } from "react";

// Button component
const Button = React.memo(({ onClick, label }) => {
  console.log(`${label} button rendered`);
  return <button onClick={onClick}>{label}</button>;
});

// Parent component
const CallbackExample = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  const increment = useCallback(() => setCount((prev) => prev + 1), []);
  const decrement = useCallback(() => setCount((prev) => prev - 1), []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>useCallback Example</h1>
      <p>Count: {count}</p>
      <Button onClick={increment} label="Increment" />
      <Button onClick={decrement} label="Decrement" />
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
        style={{ marginTop: "10px" }}
      />
    </div>
  );
};

export default CallbackExample;

/**
 * When to use:
 * - Use useCallback to memoize functions passed as props, especially when working with React.memo.
 * - Avoid overusing it for inline functions that are cheap to create.
 */
