// Function to fetch and display library hours based on the selected date
function fetchLibraryHours() {
    // Get the selected date from the input field
    let selectedDate = document.getElementById("datePicker").value;

    // Check if a date is selected
    if (!selectedDate) {
        document.getElementById("libraryHours").innerHTML = "<p style='color:red;'>⚠️ Please select a date.</p>";
        return;
    }

    // Convert the selected date to CST time zone
    let date = new Date(selectedDate + "T00:00:00-06:00"); // Ensures CST time

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let day = date.getDay();

    // Get formatted date for display
    let formattedDate = date.toLocaleDateString("en-US", { timeZone: "America/Chicago", weekday: "long", year: "numeric", month: "long", day: "numeric" });

    // Get current CST time
    let currentTime = new Date().toLocaleTimeString("en-US", { timeZone: "America/Chicago", hour: "2-digit", minute: "2-digit" });

    let message = "";

    // Assign hours based on the day selected
    if (day >= 1 && day <= 5) { // Monday to Friday
        message = "<strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM CST";
    } else if (day === 6) { // Saturday
        message = "<strong>Saturday:</strong> 9:00 AM - 3:00 PM CST";
    } else if (day === 0) { // Sunday
        message = "<strong>Sunday:</strong> Closed";
    }

    // Display the selected date, day, and library hours
    document.getElementById("dateOutput").innerHTML = `<strong>Date:</strong> ${formattedDate}`;
    document.getElementById("timeOutput").innerHTML = `<strong>Current Time (CST):</strong> ${currentTime}`;
    document.getElementById("libraryHours").innerHTML = message;
}
