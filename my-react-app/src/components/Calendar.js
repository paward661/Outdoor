import { useState } from "react";
import { Link } from "react-router-dom";
import "./Calendar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

function Calendar() {
  // Create a new Date object representing the current date and time
  const currentDate = new Date();
  const [year, setYear] = useState(currentDate.getFullYear());
  const [month, setMonth] = useState(currentDate.getMonth() + 1);

  // Function to generate the calendar grid for a given month and year
  function generateCalendarGrid(month, year) {
    // Update the text content of the current-month element
    const formattedMonth = new Date(year, month - 1).toLocaleString("default", {
      month: "long",
    });

    // Generate calendar days here
    const daysInMonth = new Date(year, month, 0).getDate();
    const calendarDays = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );

    return (
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={backwardIncrementMonth}>&lt;</button>
          <h2 id="current-month">
            {formattedMonth} {year}
          </h2>
          <button onClick={forwardIncrementMonth}>&gt;</button>
        </div>
        <Link to="/">
          <h1 className="home-title">OUTDOOR</h1>
        </Link>
        <div className="go-home">
          <Link to="/">
            <FontAwesomeIcon icon={faHome} />
          </Link>
        </div>
        <div className="calendar-grid">
          {calendarDays.map((day) => (
            <div key={day} className="calendar-day">
              {day}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Month incrementing functions
  function forwardIncrementMonth() {
    if (month === 12) {
      setMonth(1);
      setYear((prevYear) => prevYear + 1);
    } else {
      setMonth((prevMonth) => prevMonth + 1);
    }
  }

  function backwardIncrementMonth() {
    if (month === 1) {
      setMonth(12);
      setYear((prevYear) => prevYear - 1);
    }
    setMonth((prevMonth) => prevMonth - 1);
  }

  return generateCalendarGrid(month, year);
}

export default Calendar;
