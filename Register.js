document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("registerForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the values from the form inputs
        const usernameValue = document.getElementById("username").value;
        const passwordValue = document.getElementById("password").value;
        const confirmPasswordValue = document.getElementById("confirmPassword").value;

        // Validate that the passwords match
        if (passwordValue !== confirmPasswordValue) {
            alert('Passwords do not match!');
            return; // Stop further execution if passwords don't match
        }

        // Save username and password to localStorage
        localStorage.setItem('username', usernameValue);
        localStorage.setItem('password', passwordValue);

        alert('Sign Up Successful');

        // Optionally redirect to login page
        window.location.href = 'Account.html'; // Adjust this to your actual login page URL
    });
});
