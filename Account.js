document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btn").addEventListener("click", function(event) {
        // Prevent the form from submitting
        event.preventDefault();

        // Get the username and password values
        const usernameValue = document.getElementById("username").value;
        const passwordValue = document.getElementById("password").value;

        // Get stored username and password from localStorage
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        // Check credentials
        if (usernameValue === storedUsername && passwordValue === storedPassword){
            window.location.href = "index.html"; // Redirect to the new page
        }
        else {
            alert("Incorrect username or password"); // Show error message
        }
        
    });
});
