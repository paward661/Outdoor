import { useState, useEffect } from "react";
import "./ProfilePic.css";

function ProfilePic({ editOn, save, picReset }) {
  const [imageData, setImageData] = useState("");
  const [imgDatChange, setImgDatChange] = useState(false);

  useEffect(() => {
    // Fetch the image data when the component mounts
    getImageFromS3().then((data) => setImageData(data));
  }, []);

  useEffect(() => {
    if (imgDatChange && save) {
      saveImageToS3(imageData);
      setImgDatChange(false);
    }
  }, [save]);

  useEffect(() => {
    if (picReset) {
      getImageFromS3().then((data) => setImageData(data));
      setImgDatChange(false);
      // console.log("picReset is true");
    }
    // console.log("picReset changed");
  }, [picReset]);

  function uploadImage(event) {
    // console.log("attempting to stage an image");
    var selectedFile = event.target.files[0];
    if (selectedFile) {
      var reader = new FileReader();
      // Displays profile pic after an image is selected
      reader.onload = function (event) {
        // console.log(event.target.result);
        // console.log("image staged");
        setImageData(event.target.result);
        setImgDatChange(true);
      };
      reader.readAsDataURL(selectedFile);
    }
    // To allow user to select the same photo multiple times
    event.target.value = "";
  }

  function saveImageToS3(uploadedImageSrc) {
    fetch(
      "https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic",
      {
        method: "POST",
        body: uploadedImageSrc, // Pass the base64-encoded image data
        headers: {
          "Content-Type": "image/jpeg",
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          // Image uploaded successfully
          // imageSrc = uploadedImageSrc;
          // return response.json();
          console.log(response.json());
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  }

  function getImageFromS3() {
    return fetch(
      "https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic",
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          console.error("Image retrival from S3 failed:", response.statusText);
        }
      })
      .catch((error) => {
        console.error("Error retrieving image:", error);
      });
  }
  return (
    <div className="circular-photo">
      {imageData && <img src={imageData} alt="The user's profile" />}
      <input
        type="file"
        id="file-input"
        className={editOn === false ? "hidden" : ""}
        onChange={uploadImage}
      />
      <label
        htmlFor="file-input"
        id="edit-profile-pic"
        className={editOn === false ? "hidden" : "text-button"}
      >
        <h2>[Edit Pic]</h2>
      </label>
      <div id="overlay" className={editOn === false ? "hidden" : ""}></div>
    </div>
  );
}

export default ProfilePic;
