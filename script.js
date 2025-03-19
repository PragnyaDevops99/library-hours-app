// Function to fetch and display library hours based on the selected date
function fetchLibraryHours() {
    let selectedDate = document.getElementById("datePicker").value;

    if (!selectedDate) {
        document.getElementById("libraryHours").innerHTML = "<p style='color:red;'>⚠️ Please select a date.</p>";
        return;
    }

    // Convert selected date to CST timezone
    let date = new Date(selectedDate + "T12:00:00-06:00");

    // Get the correct weekday name starting from Sunday
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayIndex = date.getDay();
    let dayName = weekdays[dayIndex]; // Fetch correct day name

    // Format date properly
    let formattedDate = date.toLocaleDateString("en-US", {
        timeZone: "America/Chicago",
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Get the current time in CST
    let currentTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Chicago",
        hour: "2-digit",
        minute: "2-digit"
    });

    // Assign library hours
    let message = "";
    if (dayIndex >= 1 && dayIndex <= 5) { // Monday to Friday
        message = "<strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM CST";
    } else if (dayIndex === 6) { // Saturday
        message = "<strong>Saturday:</strong> 9:00 AM - 3:00 PM CST";
    } else if (dayIndex === 0) { // Sunday
        message = "<strong>Sunday:</strong> Closed";
    }

    // Display selected details
    document.getElementById("dateOutput").innerHTML = formattedDate;
    document.getElementById("dayOutput").innerHTML = dayName;
    document.getElementById("timeOutput").innerHTML = currentTime;
    document.getElementById("libraryHours").innerHTML = message;
}

// Ensure script is properly loaded
console.log("Script.js loaded successfully");
