<script>
    document.getElementById('membership-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const email = document.getElementById('email').value;

        // Simple email validation
        if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Call the serverless function
        fetch('/.netlify/functions/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Thank you for subscribing!');
            } else {
                alert('There was an error. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error. Please try again.');
        });
    });

    // Email validation function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
</