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

    // Display the selected date for debugging (optional)
    console.log("Selected Date (in CST):", formattedDate);
    console.log("Day of the Week (0 = Sunday, 1 = Monday, etc.):", day);

    // Check if the selected date is during the exam period (for example, December 10-23)
    if (isExamPeriod(date)) {
        displayLibraryHours("Examinations: Open 24 Hours");
        return;
    }

    // Check for different days of the week and provide appropriate hours
    switch (day) {
        case 0: // Sunday
        case 6: // Saturday
            // For weekends (Saturday & Sunday), the hours are 9:00 AM to 1:00 PM
            displayLibraryHours("Weekends: 9:00 AM - 1:00 PM (CST)");
            break;
        case 1: // Monday
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
            // For weekdays (Monday to Friday), the library is open from 9:00 AM to 6:00 PM
            displayLibraryHours("Monday to Friday: 9:00 AM - 6:00 PM (CST)");

            // Check if the time is during the reservation period (6:00 PM to 11:00 PM)
            let currentTime = date.getHours();
            if (currentTime >= 18 && currentTime <= 23) {
                displayAdditionalReservationMessage();
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

// Function to display additional message for reservation period (6:00 PM to 11:00 PM)
function displayAdditionalReservationMessage() {
    let reservationMessage = "Reservations can be made between 6:00 PM and 11:00 PM (CST).";
    document.getElementById("statusMessage").innerText = reservationMessage;
}
