// Function to fetch library hours based on the selected date
function fetchLibraryHours() {
    // Get the selected date from the date picker
    let selectedDate = document.getElementById("datePicker").value;

    // Check if a date is selected
    if (!selectedDate) {
        document.getElementById("statusMessage").innerText = "⚠️ Please select a date.";
        return;
    }

    // Create a new Date object using the selected date
    let date = new Date(selectedDate);

    // Convert to CST (Central Standard Time)
    let options = { timeZone: 'America/Chicago', hour12: true };
    let formattedDate = date.toLocaleString('en-US', options);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let day = date.getDay();

    // Display the selected date and time for debugging (optional)
    console.log("Selected Date (in CST):", formattedDate);
    document.getElementById("selectedDateDisplay").innerText = `Selected Date: ${formattedDate}`;

    // Check if the selected date is during the exam period (e.g., December 10-23)
    if (isExamPeriod(date)) {
        displayLibraryHours("Examinations: Open 24 Hours");
        return;
    }

    // Check for different days of the week and provide appropriate hours
    switch (day) {
        case 0: // Sunday
        case 6: // Saturday
            // For weekends (Saturday & Sunday), the hours are 9:00 AM to 1:00 PM
            displayLibraryHours("Weekends (Saturday/Sunday): 9:00 AM - 1:00 PM (CST)");
            break;
        case 1: // Monday
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
            // For weekdays (Monday to Friday), the library opens at 9:00 AM and closes at 6:00 PM
            let currentTime = date.getHours();
            displayLibraryHours("Monday to Friday: Opens at 9:00 AM and closes at 6:00 PM (CST)");

            // If the time is after 6:00 PM, display the message for reservation-only hours
            if (currentTime >= 18) {
                displayLibraryHours("Library is closed after 6:00 PM, and only reservations made are accommodated.");
            }
            break;
        default:
            displayLibraryHours("⚠️ Invalid day.");
    }
}

// Function to check if the selected date is during an exam period
function isExamPeriod(date) {
    let month = date.getMonth() + 1; // JavaScript months are 0-based (January is 0, December is 11)
    let day = date.getDate();

    // Define exam period (e.g., December 10 - December 23)
    if (month === 12 && day >= 10 && day <= 23) {
        return true;
    }

    return false;
}

// Function to display the library hours on the web page
function displayLibraryHours(hours) {
    document.getElementById("libraryHours").innerText = hours;
    document.getElementById("statusMessage").innerText = ""; // Clear any previous status message
}

// Additional message for reservation period (6:00 PM to 11:00 PM)
function displayAdditionalReservationMessage() {
    let reservationMessage = "Reservations can be made between 6:00 PM and 11:00 PM (CST).";
    document.getElementById("statusMessage").innerText = reservationMessage;
}
