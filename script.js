// Function to fetch and display library hours based on selected date
function fetchLibraryHours() {
    // Get the selected date from input
    let selectedDate = document.getElementById("datePicker").value;

    // If no date is selected, show a warning message
    if (!selectedDate) {
        document.getElementById("statusMessage").innerText = "⚠️ Please select a date.";
        return;
    }

    // Convert the selected date into a JavaScript Date object
    let date = new Date(selectedDate);
    let day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    let formattedDate = date.toLocaleDateString(); // Format the selected date

    // Determine library hours based on the day of the week
    let hours = getLibraryHours(day);

    // Display library hours
    document.getElementById("statusMessage").innerText = `Library hours for ${formattedDate}:`;
    document.getElementById("libraryHours").innerHTML = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Time Slot</th>
                    <th>Availability</th>
                </tr>
            </thead>
            <tbody>
                ${hours}
            </tbody>
        </table>
    `;
}

// Function to return library hours based on the day
function getLibraryHours(day) {
    if (isExamPeriod()) {
        return `<tr><td>24 Hours</td><td>Open (Examinations)</td></tr>`;
    }

    let hoursList = [];

    if (day >= 1 && day <= 5) { // Monday to Friday
        hoursList.push(`<tr><td>9:00 AM - 6:00 PM</td><td>Open</td></tr>`);
        hoursList.push(`<tr><td>6:00 PM - 11:00 PM</td><td class="reservation-required">Reservation Required</td></tr>`);
    } else if (day === 0 || day === 6) { // Saturday & Sunday
        hoursList.push(`<tr><td>9:00 AM - 3:00 PM</td><td>Open</td></tr>`);
    }

    return hoursList.join("");
}

// Function to check if the current date is within the exam period (24 hours open)
function isExamPeriod() {
    let today = new Date();
    let month = today.getMonth() + 1; // Months are 0-indexed in JavaScript
    let day = today.getDate();

    // Example: Exam period is December 10 - December 23
    return (month === 12 && day >= 10 && day <= 23);
}
