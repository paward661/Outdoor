// Get a reference to the calendar grid container
const calendarGrid = document.querySelector('.calendar-grid');

// Function to generate the calendar grid for a given month and year
function generateCalendarGrid(month, year) {
    // Clear the existing calendar grid
    calendarGrid.innerHTML = '';

    // Get the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Loop through each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
        // Create a new calendar day element
        const calendarDay = document.createElement('div');
        calendarDay.classList.add('calendar-day');
        calendarDay.textContent = day;

        // Append the day element to the calendar grid
        calendarGrid.appendChild(calendarDay);
    }
}

// Example usage: generate the calendar grid for November 2023
generateCalendarGrid(10, 2023); // Note: JavaScript months are zero-based, so November is month index 10
