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

    // Get the current time in Central Standard Time (CST)
    let currentTime = date.toLocaleString("en-US", { timeZone: "America/Chicago" });
    currentTime = new Date(currentTime).toLocaleTimeString();

    // Display the selected date, day, and time in the table
    document.getElementById("selectedDate").innerText = formatDate(date);
    document.getElementById("selectedDay").innerText = formatDay(day);
    document.getElementById("selectedTime").innerText = currentTime;

    // Display the appropriate library hours
    if (day >= 1 && day <= 5) { // Monday to Friday
        document.getElementById("libraryHours").innerText = "9:00 AM to 11:00 PM CST";
    } else if (day === 6) { // Saturday
        document.getElementById("libraryHours").innerText = "9:00 AM to 2:00 PM CST";
    } else { // Sunday
        document.getElementById("libraryHours").innerText = "Closed";
    }
}

// Function to format the date to display in the table
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Function to format the day of the week
function formatDay(day) {
    switch (day) {
        case 0: return "Sunday";
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday";
        default: return "Invalid Day";
    }
}
