document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('addressForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = {
      action: 'addMember',
      streetAddress: document.getElementById('streetAddress').value,
      suburb: document.getElementById('suburb').value,
      state: document.getElementById('state').value,
      postcode: document.getElementById('postcode').value,
      country: document.getElementById('country').value,
      name: document.getElementById('name').value,
      background: document.getElementById('background').value,
      language: document.getElementById('language').value
    };

    fetch('https://script.google.com/macros/s/AKfycbzQa6_UA0J5rq3QreZ4rdcw26BsLIxEyIGV0i5RCtQgYuQaWsmh5JRBFKlA6CM3h8Ft/exec', { // Replace with your actual script ID
      method: 'POST',
      mode: 'no-cors', // no-cors means we can't read the response from the server
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      // Check if the response type is 'opaque', which occurs with 'no-cors'
      if (response.type === 'opaque' || response.ok) {
        // If 'opaque' or response is OK, assume success
        alert('Data submitted successfully');
        form.reset(); // Reset the form on assumed success
      } else {
        // If the response is not 'opaque' and is not OK, throw an error
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit data: ' + error.message);
    });
  });
});


document.addEventListener('DOMContentLoaded', function() {
  var updateVisitForm = document.getElementById('updateVisitForm');

  updateVisitForm.addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = {
      action: 'updateVisits',
      addressID: document.getElementById('addressID').value,
      visitDate: document.getElementById('visitDate').value,
      visitNotes: document.getElementById('visitNotes').value,
      inactiveFlag: document.getElementById('inactiveFlag').checked // true or false
    };

    fetch('https://script.google.com/macros/s/AKfycbzQa6_UA0J5rq3QreZ4rdcw26BsLIxEyIGV0i5RCtQgYuQaWsmh5JRBFKlA6CM3h8Ft/exec', { // Replace with your actual script ID
      method: 'POST',
      mode: 'no-cors', // no-cors means we won't be able to read the response
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (response.ok || response.type === 'opaque') { // Check if the response is ok or 'opaque'
        alert('Visit updated successfully'); // Provide user feedback
        updateVisitForm.reset(); // Reset the form after successful submission
      } else {
        throw new Error('Network response was not ok.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit visit: ' + error.message); // Provide error feedback
    });
  });
});

function geocodeAddresses() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName('Main'); // Name of the sheet where the addresses are stored
  var dataRange = sheet.getDataRange(); // Get the range of the data
  var values = dataRange.getValues(); // Get the data as a 2D array

  for (var i = 1; i < values.length; i++) { // Start at 1 to skip the header row
    var row = values[i];
    var address = row[1] + ', ' + row[2] + ', ' + row[3] + ', ' + row[4]; // Concatenate the address components
    var geocodeResult = Maps.newGeocoder().geocode(address); // Use the Maps service to geocode the address
    if (geocodeResult.status == 'OK') {
      var latLng = geocodeResult.results[0].geometry.location;
      sheet.getRange(i + 1, 9).setValue(latLng.lat); // Store latitude
      sheet.getRange(i + 1, 10).setValue(latLng.lng); // Store longitude
    } else {
      Logger.log('Geocode failed for address: ' + address);
    }
  }
  SpreadsheetApp.flush(); // Apply the changes to the spreadsheet
}
