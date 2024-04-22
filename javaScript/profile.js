// Get references
const editButton = document.getElementById('edit-button');
const editProfilePicButton = document.getElementById('edit-profile-pic')
const profilePicOverlay = document.getElementById('overlay')
const saveEditsButton = document.getElementById('save-button')
const fileInput = document.getElementById('file-input')

function editOn() {
    // Toggle the 'hidden' class
    editProfilePicButton.classList.toggle('hidden');
    profilePicOverlay.classList.toggle('hidden');
    saveEditsButton.classList.toggle('hidden');
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

// Add a click event listener to the button
editButton.addEventListener('click', editOn);

editProfilePicButton.addEventListener('click', function(event) {
    event.preventDefault()
    fileInput.click();
});

fileInput.addEventListener('change', uploadImage);
