//#####################################################################################################################
// Need to add an API call to get the profile pic. (Needs to be applied in a way that propagates to the home page)
// Use a default profile pic if there is no image stored at the expected location
//#####################################################################################################################

// Get references to html elements
const editButton = document.getElementById('edit-button');
const editButtonText = document.getElementById('edit-button-text');
const editProfilePicButton = document.getElementById('edit-profile-pic');
const profilePicOverlay = document.getElementById('overlay');
const saveEditsButton = document.getElementById('save-button');
const fileInput = document.getElementById('file-input');
const bioTextInput = document.getElementById('text-input-bio');
const bioText = document.getElementById('text-bio');
const emailInput = document.getElementById('text-input-email');
const phoneInput = document.getElementById('text-input-phone');
const locInput = document.getElementById('text-input-loc');
const emailText = document.getElementById('text-email');
const phoneText = document.getElementById('text-phone');
const locText = document.getElementById('text-loc');
var imageSrc = document.getElementById('profile-pic').src;
var uploadedImageSrc = imageSrc;

// Edit the profile information
function editOn(cancelEdit) {
    // Unless editOn() used in save function, cancelEdit assumed to be true
    cancelEdit = typeof cancelEdit !== 'undefined' ? cancelEdit : true;

    if (cancelEdit && editButtonText.textContent == "[Cancel]") {
        // Restore to original image
        document.getElementById('profile-pic').src = imageSrc;
    }

    // Toggle the 'hidden' class
    editProfilePicButton.classList.toggle('hidden');
    profilePicOverlay.classList.toggle('hidden');
    saveEditsButton.classList.toggle('hidden');
    bioTextInput.classList.toggle('hidden');
    emailInput.classList.toggle('hidden');
    phoneInput.classList.toggle('hidden');
    locInput.classList.toggle('hidden');

    if (bioTextInput.classList.contains('hidden')) {
        // Return to appropriate format when profile page is not being editted
        document.documentElement.style.setProperty('--profile-info-height', `23%`);
        editButtonText.textContent = "[Edit Profile]";
    } else {
        // Retrieve the current value of the CSS variable --profile-info-height
        const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--profile-info-height');

        // Parse the numeric portion of the value
        const numericHeightPercentage = parseFloat(currentHeight);

        // Add 80px to the numeric value
        const viewportHeight = window.innerHeight;
        const newHeight = viewportHeight * (numericHeightPercentage / 100) + 80;

        // Update the CSS variable with the new value
        document.documentElement.style.setProperty('--profile-info-height', `${newHeight}px`);
        editButtonText.textContent = "[Cancel]";
    }
}

// Allows a user to select an image locally.
function uploadImage() {
    var selectedFile = this.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        // Displays profile pic after an image is selected
        reader.onload = function(event) {
            uploadedImageSrc = event.target.result;
            // console.log(uploadedImageSrc)
            document.getElementById('profile-pic').src = uploadedImageSrc;
        };
        reader.readAsDataURL(selectedFile);
    }
}

function saveImageToS3() {
    fetch('https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic', {
            method: 'POST',
            body: uploadedImageSrc, // Pass the base64-encoded image data
            headers: {
                'Content-Type': 'image/jpeg',
            },
        })
        .then(response => {
            if (response.ok) {
                // Image uploaded successfully
                imageSrc = uploadedImageSrc;
                // return response.json();
                // console.log(response.json());
            } else {
                console.error('Image upload failed:', response.statusText);
            }
        })
        .catch(error => {
            console.error('Error uploading image:', error);
        });
}

function getImageFromS3() {
    fetch('https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v3/profile-pic', {
            method: 'GET',
        })
        .then(response => {
            if (response.ok) {
                return response.text();
            } else {
                console.error('Image retrival from S3 failed:', response.statusText);
            }
        })
        .then(data => {
            // console.log(data);
            document.getElementById('profile-pic').src = data;
        })
        .catch(error => {
            console.error('Error retrieving image:', error);
        });
}

// Save the edits to the profile information
function save() {
    const defaultBioText = "Enter text here";
    const preBioText = "Bio: ";
    const defaultEmailText = "Enter a valid Email";
    const preEmailText = "Email: ";
    const defaultPhoneText = "Enter a valid phone number";
    const prePhoneText = "Phone: ";
    const defaultLocText = "Enter a valid location";
    const preLocText = "Location: ";
    const itemList = [[bioTextInput, bioText,   defaultBioText,   preBioText], 
                      [emailInput,   emailText, defaultEmailText, preEmailText], 
                      [phoneInput,   phoneText, defaultPhoneText, prePhoneText], 
                      [locInput,     locText,   defaultLocText,   preLocText]];
    for (const [input, output, defaultText, preText] of itemList) {
        if (input.value && input.value !== defaultText) {
            output.textContent = preText+input.value;
        }
        input.value = defaultText;
    }
    saveImageToS3();
    editOn(false);
    // getImageFromS3();
}

getImageFromS3();
// testPreflight();

// Add a click event listener to the edit button
editButton.addEventListener('click', editOn);

// Add a click event listener to the edit profile pic button
editProfilePicButton.addEventListener('click', function(event) {
    event.preventDefault();
    fileInput.click();
});

// If user provides an image, display it
fileInput.addEventListener('change', uploadImage);

// Saves provided profile info if user clicks save button
saveEditsButton.addEventListener('click', save);

