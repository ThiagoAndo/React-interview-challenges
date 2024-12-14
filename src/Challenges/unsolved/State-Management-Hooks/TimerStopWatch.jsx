import React from "react";
import { useState, useEffect } from "react";

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
let min = 0;
let hr = 0;
const TimerUI = () => {
  const [time, setTime] = useState({ timer: 0, isRunning: false });
  let timeOut = null;

  const startTime = () => {
    timeOut = setInterval(() => {
      setTime((prev) => ({
        ...prev,
        timer: prev.timer === 59 ? 0 : prev.timer + 1,
      }));
    }, 200);
  };

  console.log("running...");
  const returnZero = (time) => (time < 10 ? 0 : "");

  useEffect(() => {
    return clearTimeout(timeOut);
  }, [time.isRunning]);

  return (
    /*Side Effects in JSX:

Increment operators (hr++ and min++) are causing side effects directly
 within your JSX. This is not recommended because JSX should only be 
 responsible for rendering, not modifying state or variables.
When hr++ or min++ executes, they modify the values of hr and min directly,
 which can lead to unexpected results.
Evaluation Order:

In JavaScript, logical operators like && and || evaluate left-to-right and 
return the last evaluated value. When combined with expressions that have 
side effects, the result might not align with your expectations.
State Management:

Your useState hook for time is well-defined, but you're trying to manually 
manipulate hr and min outside of the useState mechanism, which creates 
inconsistency between the UI and the internal logic.
Timer Logic in JSX:

The evaluation inside JSX is complex and mixes timer logic with rendering.
 This makes it harder to debug and prone to errors.*/
 
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
        {`${returnZero(hr)}${
          min === 59 && hr === 24 && !time.isRunning ? (hr = 0) : hr++
        }:
          ${returnZero(min)}${
          time.timer === 59 && time.isRunning ? (hr = 0) : min++
        }:${returnZero(time.timer)}${time.timer}`}
      </div>
      <div>
        <button
          onClick={startTime}
          style={{ padding: "10px 20px", marginRight: "10px" }}
        >
          Start
        </button>
        <button style={{ padding: "10px 20px", marginRight: "10px" }}>
          Stop
        </button>
        <button style={{ padding: "10px 20px" }}>Reset</button>
      </div>
    </div>
  );
};

export default TimerUI;
