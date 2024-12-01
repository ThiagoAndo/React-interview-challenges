// 1. CounterUI Challenge
// Create a CounterUI component with the following requirements:

// Display a numeric count.
// Provide three buttons to:
// Increment the count.
// Decrement the count.
// Reset the count to 0.
// Style the count display and buttons to ensure a clean and user-friendly interface.
// Ensure the component is reusable and takes props for the count and callback functions
// for the buttons (onIncrement, onDecrement, and onReset).

const CounterUI = ({ count, onIncrement, onDecrement, onReset }) => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Counter App</h1>
      <div
        style={{
          fontSize: "24px",
          margin: "20px 0",
          padding: "10px 20px",
          border: "1px solid #ddd",
          borderRadius: "5px",
          display: "inline-block",
          backgroundColor: "#f5f5f5",
        }}
      >
        Count: {count}
      </div>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onIncrement}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Increment
        </button>
        <button
          onClick={onDecrement}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "#f44336",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Decrement
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "10px 20px",
            margin: "5px",
            backgroundColor: "#2196F3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

// Initial count: 0

// Without functional updates:
// ---------------------------
// setCount(count + 1);  // count = 0 -> updates to 1
// setCount(count + 1);  // count = 0 -> updates to 1 (again)
// setCount(count + 1);  // count = 0 -> updates to 1 (again)
// Final count: 1

// With functional updates:
// -------------------------
// setCount((prevCount) => prevCount + 1);  // prevCount = 0 -> updates to 1
// setCount((prevCount) => prevCount + 1);  // prevCount = 1 -> updates to 2
// setCount((prevCount) => prevCount + 1);  // prevCount = 2 -> updates to 3
// Final count: 3
