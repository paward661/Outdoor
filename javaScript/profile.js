// Get references
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
var imageSrc = document.getElementById('profile-pic').src

// Need to edit function so that it throws away image if cancel is selected
// function editOn(cancelEdit = true) {
function editOn() {
    // Toggle the 'hidden' class
    editProfilePicButton.classList.toggle('hidden');
    profilePicOverlay.classList.toggle('hidden');
    saveEditsButton.classList.toggle('hidden');
    bioTextInput.classList.toggle('hidden');
    emailInput.classList.toggle('hidden');
    phoneInput.classList.toggle('hidden');
    locInput.classList.toggle('hidden');

    if (bioTextInput.classList.contains('hidden')) {
        document.documentElement.style.setProperty('--profile-info-height', `23%`);
        editButtonText.textContent = "[Edit Profile]";
    } else {
        // Retrieve the current value of the CSS variable --profile-info-height
        const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--profile-info-height');

        // Parse the numeric portion of the value (removing 'px' if present)
        const numericHeightPercentage = parseFloat(currentHeight);

        // Add 80px to the numeric value
        const viewportHeight = window.innerHeight;
        const newHeight = viewportHeight * (numericHeightPercentage / 100) + 80;
        // const newHeight = 80;

        // Update the CSS variable with the new value
        document.documentElement.style.setProperty('--profile-info-height', `${newHeight}px`);
        editButtonText.textContent = "[Cancel]";
    }

    // if (cancelEdit && editButtonText.textContent == "[Cancel]") {

    // }
}

function uploadImage() {
    var selectedFile = this.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var uploadedImageSrc = event.target.result;

            fetch('https://rc8a0osdn1.execute-api.us-west-1.amazonaws.com/v1/profile-pic', {
                method: 'POST',
                body: uploadedImageSrc, // Pass the base64-encoded image data
                headers: {
                    'Content-Type': 'image/jpeg', // Set the content type appropriately
                },
            })
            .then(response => {
                if (response.ok) {
                    // Image uploaded successfully
                    document.getElementById('profile-pic').src = uploadedImageSrc;
                } else {
                    console.error('Image upload failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error uploading image:', error);
            });
        };
        reader.readAsDataURL(selectedFile);
    }
}

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
    editOn();
}

// Add a click event listener to the button
editButton.addEventListener('click', editOn);

editProfilePicButton.addEventListener('click', function(event) {
    event.preventDefault();
    fileInput.click();
});

fileInput.addEventListener('change', uploadImage);

saveEditsButton.addEventListener('click', save);

