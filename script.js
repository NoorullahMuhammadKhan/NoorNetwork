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

    fetch('https://script.google.com/macros/s/AKfycbyTBrRqtL-ZZdCIksKrxYSQ9kUuZ-PKPfqDt0ZbUElUv-yNXNNmek3F95fntIPAVGqw/exec', { // Replace with your actual script ID
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





















  
