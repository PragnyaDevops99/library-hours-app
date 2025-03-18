// Function to fetch and display library hours
async function fetchLibraryHours() {
    // Get the date selected by the user
    let selectedDate = document.getElementById("datePicker").value;

    // If no date is chosen, show an error message
    if (!selectedDate) {
        document.getElementById("statusMessage").innerText = "Please select a date.";
        return;
    }

    // Show a loading message while fetching data
    document.getElementById("statusMessage").innerText = "Loading...";

    try {
        // Fetch data from the API
        let response = await fetch("https://libcal.utk.edu/widget/hours/grid?format=json&weeks=4&systemTime=0");
        let data = await response.json();  // Convert API response to JSON

        // Find hours for the selected date
        let hoursForDate = findHoursForDate(data, selectedDate);

        // Display the results
        if (hoursForDate) {
            document.getElementById("libraryHours").innerText = `Library Hours: ${hoursForDate}`;
            document.getElementById("statusMessage").innerText = "Results found!";
        } else {
            document.getElementById("libraryHours").innerText = "No hours available.";
            document.getElementById("statusMessage").innerText = "No data for this date.";
        }
    } catch (error) {
        document.getElementById("statusMessage").innerText = "Error fetching data.";
    }
}

// Function to extract hours from API data
function findHoursForDate(data, selectedDate) {
    // Loop through each library location
    for (let location of data.locations) {
        for (let day of location.weeks[0].days) {
            if (day.date === selectedDate) {
                return day.rendered;  // Return formatted hours
            }
        }
    }
    return null;  // Return null if no matching date is found
}
