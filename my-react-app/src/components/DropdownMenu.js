import React, { useState, useEffect } from "react";
import "./DropdownMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHiking,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function DropdownMenu() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (!event.target.closest(".menu")) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);
  return (
    <div className="menu">
      {" "}
      {/* Menu button that allows access to calendar, new events, and profile */}
      <button
        id="menu-button"
        className="hamburger-menu"
        onClick={toggleDropdown}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul id="dropdown" className={isDropdownVisible ? "" : "hidden"}>
        <li>
          <Link to="/calendar">
            <FontAwesomeIcon icon={faCalendar} /> Calendar
          </Link>
        </li>{" "}
        {/* Access to calendar page */}
        <li id="new-event-button">
          <FontAwesomeIcon icon={faHiking} />
        </li>{" "}
        {/* Create a new event */}
        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>{" "}
        {/* View/edit your profile info */}
      </ul>
    </div>
  );
}

export default DropdownMenu;
