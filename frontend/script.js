// Attach an event listener to the form for the "submit" event.
document.getElementById('costForm').addEventListener('submit', function(e) {
    // Prevent the form from submitting normally (causing a page reload).
    e.preventDefault();
    
    // Retrieve values from the form fields.
    const vm_size = document.getElementById('vm_size').value;
    const region = document.getElementById('region').value;
    const usage_hours = document.getElementById('usage_hours').value;
    const term = document.getElementById('term').value;

    // Build an object with the form data.
    const data = { vm_size, region, usage_hours, term };

    // Use the fetch API to call the Flask backend at the '/calculate' endpoint.
    fetch('/calculate', {
        method: 'POST',  // HTTP POST request
        headers: { 'Content-Type': 'application/json' },  // Tell server data is JSON
        body: JSON.stringify(data)  // Convert our data object into a JSON string
    })
    // Convert the response to JSON.
    .then(response => response.json())
    .then(result => {
        // When we get a response, display the cost in the result div.
        document.getElementById('result').innerHTML = 'Estimated Cost: $' + result.cost.toFixed(2);
    })
    .catch(err => {
        // If there's an error, display it.
        document.getElementById('result').innerHTML = 'Error: ' + err;
    });
});
