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
    
    // Get the time in hours and minutes
    let time = date.toLocaleTimeString('en-US', { timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit' });

    // Display the selected date, day, and time in the table
    let dateString = formattedDate.split(",")[0]; // Get just the date part
    let dayString = formattedDate.split(",")[1].trim(); // Get the day part
    document.getElementById("selectedDate").innerHTML = dateString;
    document.getElementById("selectedDay").innerHTML = dayString;
    document.getElementById("selectedTime").innerHTML = time;

    // Check for different days of the week and provide appropriate hours
    switch (day) {
        case 0: // Sunday
            displayLibraryHours("Closed");
            break;
        case 6: // Saturday
            displayLibraryHours("Saturday: 9:00 AM - 2:00 PM (CST)");
            break;
        case 1: // Monday
        case 2: // Tuesday
        case 3: // Wednesday
        case 4: // Thursday
        case 5: // Friday
            displayLibraryHours("Monday to Friday: 9:00 AM - 11:00 PM (CST)");
            break;
        default:
            displayLibraryHours("⚠️ Invalid day.");
    }
}

// Function to display the library hours on the web page
function displayLibraryHours(hours) {
    document.getElementById("libraryHours").innerHTML = `<strong>Library Hours:</strong> ${hours}`;
    document.getElementById("statusMessage").innerHTML = ""; // Clear any previous status message
}
