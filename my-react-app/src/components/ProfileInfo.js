import { useEffect, useState } from "react";
import "./ProfileInfo.css";

function ProfileInfo({ editOn, save, infoReset }) {
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

  function saveInfo() {
    // If an input was provided save that as the profile info
    for (const [input, output, defaultInputText, preText] of itemList) {
      if (input.value && input.value !== defaultInputText) {
        output.textContent = preText + input.value;
      }
      input.value = defaultInputText;
    }
  }

  function infoResetFunc() {
    for (const [input, output, defaultInputText, preText] of itemList) {
      input.value = defaultInputText;
    }
  }

  useEffect(() => {
    if (save) {
      saveInfo();
      saveInterests();
    }
  }, [save]);

  useEffect(() => {
    if (infoReset) {
      infoResetFunc();
      interestReset();
    }
  }, [infoReset]);

  const defaultInterest1 = "Interest 1";
  const defaultInterest2 = "Interest 2";
  const defaultInterest3 = "Interest 3";

  const [interests, setInterests] = useState({
    interest1: defaultInterest1,
    interest2: defaultInterest2,
    interest3: defaultInterest3,
  });

  const [interestsShadow, setInterestsShadow] = useState({
    interest1: defaultInterest1,
    interest2: defaultInterest2,
    interest3: defaultInterest3,
  });

  const options = ["Football", "Tennis", "Soccer", "Basketball", "Baseball"];

  const handleChange = (event, interestKey) => {
    setInterests({
      ...interests,
      [interestKey]: event.target.value,
    });
  };

  function saveInterests() {
    for (const [key, value] of Object.entries(interests)) {
      setInterestsShadow((prevInterestsShadow) => ({
        ...prevInterestsShadow,
        [key]: value,
      }));
    }
  }

  function interestReset() {
    for (const [key, value] of Object.entries(interestsShadow)) {
      setInterests((prevInterests) => ({
        ...prevInterests,
        [key]: value,
      }));
    }
  }

  return (
    <div>
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
          {Object.keys(interests).map((key, index) => (
            <li key={index}>
              {editOn == false ? interests[key] : ""}
              <select
                value={interests[key]}
                onChange={(event) => handleChange(event, key)}
                className={editOn == false ? "hidden" : ""}
              >
                <option value={interests[key]} disabled>
                  {interests[key]}
                </option>
                {options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default ProfileInfo;
