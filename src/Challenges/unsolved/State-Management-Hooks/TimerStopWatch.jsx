import React from "react";
import {  useReducer } from "react";
// Timer/Stopwatch Challenge:
/**
 * 1. Create a Stopwatch UI with:
 *    - A display area to show elapsed time in seconds.
 *    - Buttons to start, stop, and reset the timer.
 * 2. Include placeholder text for when the timer is not running.
 * Bonus:
 * - Add lap functionality to record intermediate times.
 * The issue lies in your JSX evaluation logic, specifically with the
 * increment operations (hr++, min++)
 *  and the use of logical expressions (&&, !, ?) inside your JSX code.
 *  Here's a breakdown of why this could result in unexpected behavior:
 */
const initialState = { hr: 0, min: 0, sec: 0 };
const reducer = (state, action) => {
  switch (action.type) {
    case "STOP":
      clearTimeout(timeOut);
      return state;
    case "RESET":
      return initialState;
    case "CLICK":
      if (state.sec <= 58) return { ...state, sec: state.sec + 1 };
      if (state.min <= 58 && state.sec === 59)
        return { ...state, min: state.min + 1, sec: 0 };
      if (state.hr <= 22 && state.min === 59)
        return { hr: state.hr + 1, min: 0, sec: 0 };
      if (state.hr === 23 && state.min === 59 && state.sec === 59)
        return { hr: 0, min: 0, sec: 0 };
      break;
    default:
      return state;
  }
};
const TimerUI = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const startTime = () => {
    timeOut = setInterval(() => {
      dispatch({ type: "CLICK" });
    }, 100);
  };
  const returnZero = (time) => (time < 10 ? 0 : "");
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Stopwatch</h1>
      <div
        style={{
          fontSize: "48px",
          margin: "20px 0",
          border: "2px solid #ddd",
          padding: "10px 20px",
          display: "inline-block",
          borderRadius: "10px",
        }}
      >
        {`${returnZero(state.hr)}${state.hr}:${returnZero(state.min)}${
          state.min
        }:${returnZero(state.sec)}${state.sec}`}
      </div>
      <div>
        <button
          onClick={startTime}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Start
        </button>
        <button
          onClick={() => dispatch({ type: "STOP" })}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Stop
        </button>
        <button
          onClick={() => dispatch({ type: "RESET" })}
          style={{ padding: "10px 20px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerUI;
