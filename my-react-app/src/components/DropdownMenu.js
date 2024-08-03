import React, { useState, useEffect } from "react";
import "./DropdownMenu.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faHiking,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
    <div class="menu">
      {" "}
      {/* Menu button that allows access to calendar, new events, and profile */}
      <button id="menu-button" class="hamburger-menu" onClick={toggleDropdown}>
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul id="dropdown" class={isDropdownVisible ? "" : "hidden"}>
        <li>
          <a href="calendar.html">
            <FontAwesomeIcon icon={faCalendar} />
          </a>
        </li>{" "}
        {/* Access to calendar page */}
        <li id="new-event-button">
          <FontAwesomeIcon icon={faHiking} />
        </li>{" "}
        {/* Create a new event */}
        <li>
          <a href="profile.html">
            <FontAwesomeIcon icon={faUser} />
          </a>
        </li>{" "}
        {/* View/edit your profile info */}
      </ul>
    </div>
  );
}

export default DropdownMenu;
