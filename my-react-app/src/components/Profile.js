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
      setSave(false);
    }
  }, [save]);

  function toggleEdit(cancelEdit) {
    // Toggle the edit UI
    setEditOn(!editOn);

    if (!editOn) {
      // Reset the reset flag when edit is turned back on
      setReset(false);
    } else {
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
