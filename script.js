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

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let day = date.getDay();

    // Get the current time
    let currentTime = date.getHours();

    // Convert the selected date to CST
    let cstDate = date.toLocaleString("en-US", { timeZone: "America/Chicago" });
    let cstDateObj = new Date(cstDate);

    // Display the selected date, day, and time for debugging
    let formattedDate = cstDateObj.toLocaleDateString();
    let formattedDay = cstDateObj.toLocaleString("en-US", { weekday: "long" });
    let formattedTime = cstDateObj.toLocaleTimeString();

    // Display the selected date, day, and time in the table
    document.getElementById("selectedDate").innerText = formattedDate;
    document.getElementById("selectedDay").innerText = formattedDay;
    document.getElementById("selectedTime").innerText = formattedTime;

    // Check if the selected date is during the exam period (for example, December 10-23)
    if (isExamPeriod(date)) {
        displayLibraryHours("Examinations: Open 24 Hours");
        return;
    }

    // Check for different days of the week and provide appropriate hours
    switch (day) {
        case 0: // Sunday
            displayLibraryHours("Sunday: Closed");
            break;
        case 6: // Saturday
            displayLibraryHours("Saturday: 9:00 AM - 2:00 PM CST");
            break;
        case 1: // Monday
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
            if (currentTime >= 9 && currentTime < 18) {
                displayLibraryHours("Monday to Friday: 9:00 AM - 6:00 PM CST");
            } else if (currentTime >= 18 && currentTime <= 23) {
                displayLibraryHours("Monday to Friday (6:00 PM - 11:00 PM CST): Reservation Required");
            } else {
                displayLibraryHours("The library is closed at this time.");
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
