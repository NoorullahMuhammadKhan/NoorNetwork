document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('addressForm');

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    var formData = {
      streetAddress: document.getElementById('streetAddress').value,
      suburb: document.getElementById('suburb').value,
      state: document.getElementById('state').value,
      postcode: document.getElementById('postcode').value,
      country: document.getElementById('country').value,
      name: document.getElementById('name').value,
      background: document.getElementById('background').value,
      language: document.getElementById('language').value
    };

    fetch('https://script.google.com/macros/s/AKfycbxKCcg0HxK6UBlgiE-HKhzOWhMTxdQrEG3hVZuuTTGUIJSwrsZ6saWCb_7AQmibSE19/exec', {
      method: 'POST',
      mode: 'no-cors', // This mode is for handling CORS policy
      headers: {
        'Content-Type': 'application/json',
        // 'Accept': 'application/json' // You can uncomment this if your server sends back JSON
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok && response.type !== 'opaque') {
        // 'opaque' responses occur when 'no-cors' is used, meaning the response is there, but cannot be inspected
        throw new Error('Network response was not ok');
      }
      return response.json(); // This will fail for 'opaque' responses, as they cannot be read
    })
    .then(data => {
      console.log(data);
      alert('Data submitted successfully');
      form.reset();
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Failed to submit data: ' + error.message);
    });
  });
});














  
