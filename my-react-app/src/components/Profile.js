import { useState, useEffect } from "react";
import Header from "./Header";
import GoHome from "./GoHome";
import ProfilePic from "./ProfilePic.js";
import ProfileInfo from "./ProfileInfo.js";
import "./Profile.css";

function Profile() {
  const [editOn, setEditOn] = useState(false);
  const [save, setSave] = useState(false);
  const [reset, setReset] = useState(false);

  useEffect(() => {
    // When the save state is enabled close the edit UI
    if (save) {
      toggleEdit(false);
    }
  }, [save]);

  function toggleEdit(cancelEdit) {
    // Toggle the edit UI
    setEditOn(!editOn);

    if (!editOn) {
      // Initialize edit GUI
      // Reset the reset flag when edit is turned back on
      setReset(false);
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
      // Close edit GUI
      document.documentElement.style.setProperty(
        "--profile-info-height",
        `23%`
      );
      if (cancelEdit) {
        // Trigger reset functions in ProfileInfo and ProfilePic. Should reset inputs.
        setReset(true);
      }
    }
  }
  return (
    <div>
      <Header pageTitle={"User Profile"} />
      <ProfilePic editOn={editOn} save={save} picReset={reset} />
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
      <ProfileInfo editOn={editOn} save={save} infoReset={reset} />
      <button
        id="save-button"
        className={`text-button ${editOn == false ? "hidden" : ""}`}
        onClick={() => setSave(true)}
      >
        <h2>[Save Profile]</h2>
      </button>
    </div>
  );
}

export default Profile;
