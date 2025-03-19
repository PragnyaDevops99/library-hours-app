// Function to fetch and display library hours based on selected date
function fetchLibraryHours() {
    // Get the selected date from input
    let selectedDate = document.getElementById("datePicker").value;

    if (!selectedDate) {
        document.getElementById("statusMessage").innerText = "⚠️ Please select a date.";
        return;
    }

    // Convert the selected date into a JavaScript Date object
    let date = new Date(selectedDate);
    let day = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    let formattedDate = date.toLocaleDateString();

    // Determine library hours based on the day
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
        return `<tr><td>24 Hours</td><td>Open</td></tr>`;
    }

    let hoursList = [];

    if (day >= 1 && day <= 5) { // Monday to Friday
        hoursList.push(`<tr><td>9:00 AM - 6:00 PM</td><td>Open to all</td></tr>`);
        hoursList.push(`<tr><td>6:00 PM - 11:00 PM</td><td class="reservation-required">Reservation Required</td></tr>`);
    } else if (day === 0 || day === 6) { // Saturday & Sunday
        hoursList.push(`<tr><td>9:00 AM - 3:00 PM</td><td>Open to all</td></tr>`);
    }

    return hoursList.join("");
}

// Function to check if the selected date falls within an exam period
function isExamPeriod() {
    let today = new Date();
    let month = today.getMonth() + 1; // Months are 0-indexed in JS
    let day = today.getDate();

    // Example exam period: December 10 - December 23
    return (month === 12 && day >= 10 && day <= 23);
}
