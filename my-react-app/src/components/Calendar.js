import { useState } from "react";
import "./Calendar.css";

function Calendar() {
  // Create a new Date object representing the current date and time
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  // Get a reference to the calendar grid container
  const calendarGrid = document.querySelector(".calendar-grid");

  // Get a reference to the calendar header
  const calendarHeader = document.getElementById("current-month");

  // Function to generate the calendar grid for a given month and year
  function generateCalendarGrid(month, year) {
    // Clear the existing calendar grid
    calendarGrid.innerHTML = "";

    // Update the text content of the current-month element
    const formattedMonth = new Date(year, month - 1).toLocaleString("default", {
      month: "long",
    });
    calendarHeader.textContent = `${formattedMonth} ${year}`;

    // Get the number of days in the month
    const daysInMonth = new Date(year, month, 0).getDate();

    // Loop through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      // Create a new calendar day element
      const calendarDay = document.createElement("div");
      calendarDay.classList.add("calendar-day");
      calendarDay.textContent = day;

      // Append the day element to the calendar grid
      calendarGrid.appendChild(calendarDay);
    }
  }

  // Create month incrementing functions
  function forwardIncrementMonth() {
    month += 1;
    if (month > 12) {
      month -= 12;
      year += 1;
    }
    generateCalendarGrid(month, year);
  }
  function backwardIncrementMonth() {
    month -= 1;
    if (month < 1) {
      month += 12;
      year -= 1;
    }
    generateCalendarGrid(month, year);
  }

  // Example usage: generate the calendar grid for November 2023
  generateCalendarGrid(month, year); // Note: JavaScript months are zero-based, so November is month index 10

  return (
    <div class="calendar">
      <div class="calendar-header">
        <button onClick={backwardIncrementMonth}>&lt;</button>
        <h2 id="current-month">Month Year</h2>
        <button onClick={forwardIncrementMonth}>&gt;</button>
      </div>
      <h1>
        <a class="home-title" href="home.html">
          OUTDOOR
        </a>
      </h1>
      <a class="go-home" href="home.html">
        <i class="fas fa-home"></i>
      </a>
      <div class="calendar-grid">
        {/* Calendar days will be dynamically generated here */}
      </div>
    </div>
  );
}

export default Calendar;
