import { useState } from "react";
import "./Stats.css";

function Stats() {
  const [percentage, setPercentage] = useState(0);

  function updateMeters() {
    var meters = document.querySelectorAll(".meter-bar");

    meters.forEach(function (meter) {
      meter.style.width = percentage + "%";
    });

    // Add fill class to meters with width greater than 0
    meters.forEach(function (meter) {
      if (meter.style.width !== "0%") {
        meter.classList.add("fill");
      } else {
        meter.classList.remove("fill");
      }
    });
  }
  return (
    <div className="stats">
      <div id="health-stats">
        {/* This is where health stats will be populated by ios or smart watch */}
        <h2>Health Stats</h2>
        {/* The three example meters */}
        <div className="meter-container">
          <div className="meter-bar" id="meter1"></div>
        </div>
        <p>Steps</p>
        <div className="meter-container">
          <div className="meter-bar" id="meter2"></div>
        </div>
        <p>Weekly hours of excercise</p>
        <div className="meter-container">
          <div className="meter-bar" id="meter3"></div>
        </div>
        <p>Number of trails hiked</p>
        {/* A way to see different meter levels */}
        <label htmlFor="percentage">Enter percentage value (0-100): </label>
        <input
          type="number"
          id="percentage"
          min="0"
          max="100"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
        <button onClick={updateMeters}>Update Meters</button>
      </div>
    </div>
  );
}

export default Stats;
