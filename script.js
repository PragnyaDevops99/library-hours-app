function checkLibraryHours() {
    // Get the selected date from the input
    let dateInput = document.getElementById("datePicker").value;

    // Check if a date is selected
    if (!dateInput) {
        document.getElementById("libraryHours").innerText = "⚠️ Please select a date.";
        return;
    }

    // Create a new Date object and get the day of the week
    let selectedDate = new Date(dateInput);
    let dayOfWeek = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

    // Format the selected date
    let formattedDate = selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });

    // Display the selected date in the box
    document.getElementById("selectedDate").innerText = `📅 ${formattedDate}`;

    // Determine the library hours based on the selected day
    let message;
    if (dayOfWeek === 0) {
        message = "❌ Sunday: Closed";
    } else if (dayOfWeek === 6) {
        message = "🕒 Saturday: 9:00 AM - 3:00 PM CST";
    } else {
        message = "📖 Monday to Friday: 9:00 AM - 6:00 PM CST";
    }

    // Display the message
    document.getElementById("libraryHours").innerText = message;
}
