import { useState } from "react";
import Header from "./Header";
import GoHome from "./GoHome";
import ProfilePic from "./ProfilePic.js";
import "./Profile.css";

function Profile() {
  const [editOn, setEditOn] = useState(false);

  // Profile info defaults and prepended text
  const defaultInputBioText = "Enter text here";
  const preBioText = "Bio: ";
  const defaultInputEmailText = "Enter a valid Email";
  const preEmailText = "Email: ";
  const defaultInputPhoneText = "Enter a valid phone number";
  const prePhoneText = "Phone: ";
  const defaultInputLocText = "Enter a valid location";
  const preLocText = "Location: ";

  // Profile info inputs
  const bioTextInput = document.getElementById("text-input-bio");
  const emailInput = document.getElementById("text-input-email");
  const phoneInput = document.getElementById("text-input-phone");
  const locInput = document.getElementById("text-input-loc");

  // Profile info outputs
  const bioText = document.getElementById("text-bio");
  const emailText = document.getElementById("text-email");
  const phoneText = document.getElementById("text-phone");
  const locText = document.getElementById("text-loc");

  // Profile info
  const itemList = [
    [bioTextInput, bioText, defaultInputBioText, preBioText],
    [emailInput, emailText, defaultInputEmailText, preEmailText],
    [phoneInput, phoneText, defaultInputPhoneText, prePhoneText],
    [locInput, locText, defaultInputLocText, preLocText],
  ];

  function save() {
    // If an input was provided save that as the profile info
    for (const [input, output, defaultInputText, preText] of itemList) {
      if (input.value && input.value !== defaultInputText) {
        output.textContent = preText + input.value;
      }
      input.value = defaultInputText;
    }
    toggleEdit(false);
  }

  function infoReset() {
    for (const [input, output, defaultInputText, preText] of itemList) {
      input.value = defaultInputText;
    }
  }

  function toggleEdit(cancelEdit) {
    setEditOn(!editOn);
    if (!editOn) {
      // Retrieve the current value of the CSS variable --profile-info-height
      const currentHeight = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--profile-info-height");
      // Parse the numeric portion of the value
      const numericHeightPercentage = parseFloat(currentHeight);
      // Add 80px to the numeric value
      const viewportHeight = window.innerHeight;
      const newHeight = viewportHeight * (numericHeightPercentage / 100) + 80;
      // Set the new height
      document.documentElement.style.setProperty(
        "--profile-info-height",
        `${newHeight}px`
      );
    } else {
      document.documentElement.style.setProperty(
        "--profile-info-height",
        `23%`
      );
      if (cancelEdit) {
        infoReset();
      }
    }
  }
  return (
    <div>
      <Header pageTitle={"User Profile"} />
      <ProfilePic editOn={editOn} />
      <GoHome show={!editOn} />
      <button
        id="edit-button"
        className="text-button"
        onClick={() => toggleEdit(true)}
      >
        <h2 id="edit-button-text">
          {editOn == false ? "[Edit Profile]" : "[Cancel]"}
        </h2>
      </button>
      <section className="profile">
        <div className="profile-info">
          <h2>username123</h2>
          <p id="text-bio">
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            justo risus.
          </p>
          <input
            type="text"
            id="text-input-bio"
            placeholder="Enter text here"
            className={`text-input ${editOn == false ? "hidden" : ""}`}
          />
          <ul>
            <div className="user-info">
              <li id="text-email" className="user-text">
                Email: user@example.com
              </li>
              <input
                type="text"
                id="text-input-email"
                placeholder="Enter a valid Email"
                className={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
            <div className="user-info">
              <li id="text-phone" className="user-text">
                Phone: +1234567890
              </li>
              <input
                type="text"
                id="text-input-phone"
                placeholder="Enter a valid phone number"
                className={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
            <div className="user-info">
              <li id="text-loc" className="user-text">
                Location: City, Country
              </li>
              <input
                type="text"
                id="text-input-loc"
                placeholder="Enter a valid location"
                className={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
          </ul>
        </div>
      </section>
      <section className="interests">
        <h2>Interests</h2>
        <ul>
          <li>Interest 1</li>
          <li>Interest 2</li>
          <li>Interest 3</li>
        </ul>
      </section>
      <button
        id="save-button"
        className={`text-button ${editOn == false ? "hidden" : ""}`}
        onClick={save}
      >
        <h2>[Save Profile]</h2>
      </button>
    </div>
  );
}

export default Profile;
