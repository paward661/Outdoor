import { useState, useEffect } from "react";
import "./ProfilePic.css";

function ProfilePic() {
  const [imageData, setImageData] = useState("");

  useEffect(() => {
    // Fetch the image data when the component mounts
    getImageFromS3().then((data) => setImageData(data));
  }, []);

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
    </div>
  );
}

export default ProfilePic;
