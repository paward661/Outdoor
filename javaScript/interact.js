// Get references to the button and the dropdown
const button = document.getElementById('menu-button');
const dropdown = document.getElementById('dropdown');

function toggleDropdown() {
    // Toggle the 'show' class on the dropdown
    dropdown.classList.toggle('hidden');
}

// Add a click event listener to the button
button.addEventListener('click', toggleDropdown);

// Close the dropdown if the user clicks anywhere else on the page
document.addEventListener('click', function(event) {
    if (!event.target.closest('.menu')) {
        dropdown.classList.add('hidden');
    }
});

// Prevent the dropdown from closing when clicking inside it
dropdown.addEventListener('click', function(event) {
    event.stopPropagation();
});
