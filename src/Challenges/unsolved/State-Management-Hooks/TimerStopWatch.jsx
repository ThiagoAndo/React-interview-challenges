import React from "react";

const TimerUI = () => {
  // Timer/Stopwatch Challenge:
  /**
   * 1. Create a Stopwatch UI with:
   *    - A display area to show elapsed time in seconds.
   *    - Buttons to start, stop, and reset the timer.
   * 2. Include placeholder text for when the timer is not running.
   * Bonus:
   * - Add lap functionality to record intermediate times.
   */

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
        0:00
      </div>
      <div>
        <button style={{ padding: "10px 20px", marginRight: "10px" }}>
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
