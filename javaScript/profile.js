// Get references
const editButton = document.getElementById('edit-button');
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


// Need to fix so that it adds and then removes the space taken by the text boxes
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
    } else {
        // Retrieve the current value of the CSS variable --profile-info-height
        const currentHeight = getComputedStyle(document.documentElement).getPropertyValue('--profile-info-height');
        console.log(currentHeight);

        // Parse the numeric portion of the value (removing 'px' if present)
        const numericHeightPercentage = parseFloat(currentHeight);
        console.log(numericHeightPercentage);

        // Add 80px to the numeric value
        const viewportHeight = window.innerHeight;
        const newHeight = viewportHeight * (numericHeightPercentage / 100) + 80;
        // const newHeight = 80;
        console.log(newHeight);

        // Update the CSS variable with the new value
        document.documentElement.style.setProperty('--profile-info-height', `${newHeight}px`);
    }
}

function uploadImage() {
    var selectedFile = this.files[0];
    if (selectedFile) {
        var reader = new FileReader();
        reader.onload = function(event) {
            var uploadedImageSrc = event.target.result;
            document.getElementById('profile-pic').src = uploadedImageSrc;
        };
        reader.readAsDataURL(selectedFile);
    }
}

// Need to fix saving the default values. I think the problem is once I set .value = it will always be true.
// Should check both not true and not equal to default text. Might be worth using a var for each defaut text.
function save() {
    if (bioTextInput.value) {
        bioText.textContent = "Bio: "+bioTextInput.value;
    }
    bioTextInput.value = "Enter text here";

    if (emailInput.value) {
        emailText.textContent = "Email: "+emailInput.value;
    }
    emailInput.value = "Enter a valid Email";

    if (phoneInput.value) {
        phoneText.textContent = "Phone: "+phoneInput.value;
    }
    phoneInput.value = "Enter a valid phone number";

    if (locInput.value) {
        locText.textContent = "Location: "+locInput.value;
    }
    locInput.value = "Enter a valid location";
    
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

