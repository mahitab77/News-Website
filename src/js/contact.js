document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your user ID
    emailjs.init('YOUR_USER_ID');

    // Add an event listener to the contact form
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the form data
        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';

        // Send the form data using EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                alert('Email sent successfully!');
            }, (error) => {
                console.error('Failed to send email:', error);
                alert('Failed to send email. Please try again later.');
            });
    });
});
