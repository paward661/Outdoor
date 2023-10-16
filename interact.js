// Get references to the button and the dropdown
const button = document.getElementById('menu-button');
const dropdown = document.getElementById('dropdown');

// Add a click event listener to the button
button.addEventListener('click', function() {
    // Toggle the 'show' class on the dropdown
    dropdown.classList.remove('hidden');
    dropdown.classList.add('show');
});

// Close the dropdown if the user clicks anywhere else on the page
document.addEventListener('click', function(event) {
    if (event.target !== button) {
        dropdown.classList.remove('show');
        dropdown.classList.add('hidden');
    }
});