import { useState } from "react";
import Header from "./Header";
import GoHome from "./GoHome";
import "./Profile.css";

function Profile() {
  const [editOn, setEditOn] = useState(false);

  function toggleEdit() {
    setEditOn(!editOn);
  }
  return (
    <div>
      <Header pageTitle={"User Profile"} />
      <GoHome show={!editOn} />
      <button id="edit-button" class="text-button" onClick={toggleEdit}>
        <h2 id="edit-button-text">
          {editOn == false ? "[Edit Profile]" : "[Cancel]"}
        </h2>
      </button>
      <section class="profile">
        <div class="profile-info">
          <h2>username123</h2>
          <p id="text-bio">
            Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            justo risus.
          </p>
          <input
            type="text"
            id="text-input-bio"
            placeholder="Enter text here"
            class={`text-input ${editOn == false ? "hidden" : ""}`}
          />
          <ul>
            <div class="user-info">
              <li id="text-email" class="user-text">
                Email: user@example.com
              </li>
              <input
                type="text"
                id="text-input-email"
                placeholder="Enter a valid Email"
                class={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
            <div class="user-info">
              <li id="text-phone" class="user-text">
                Phone: +1234567890
              </li>
              <input
                type="text"
                id="text-input-phone"
                placeholder="Enter a valid phone number"
                class={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
            <div class="user-info">
              <li id="text-loc" class="user-text">
                Location: City, Country
              </li>
              <input
                type="text"
                id="text-input-loc"
                placeholder="Enter a valid location"
                class={`user-text-input ${editOn == false ? "hidden" : ""}`}
              />
            </div>
          </ul>
        </div>
      </section>
      <section class="interests">
        <h2>Interests</h2>
        <ul>
          <li>Interest 1</li>
          <li>Interest 2</li>
          <li>Interest 3</li>
        </ul>
      </section>
    </div>
  );
}

export default Profile;
