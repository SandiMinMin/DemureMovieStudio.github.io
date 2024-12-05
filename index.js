$(document).ready(function() {
    // Your jQuery code to trigger the modal
    if (!localStorage.getItem('userEmail')) {
        $('#signupModal').modal('show');
    }

    // Handle the signup form submission
    $('#signupForm').on('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        const email = $('#signupEmail').val();
        const password = $('#signupPassword').val();

        // Check if email already exists
        if (localStorage.getItem('userEmail') === email) {
            
            return; // Prevent further processing
        }

        // Save user info
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userPassword', password); // Save the password for authentication
        localStorage.setItem('discountApplied', 'true'); // Apply discount for signing up
        localStorage.setItem('check','true');

        alert('Thank you for signing up! Your discount will be applied at checkout.');
        
        $('#signupModal').modal('hide');
        $('#userGreeting').html(`Logged in as: <strong>${email}</strong>`);
        $('#profileSection').show();
        $('#signupSection').hide();
        $('#loginSection').hide();
        $('#signOutContainer').show(); // Show sign-out button
    });

    
});



let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to add item to the cart
function addToCart(productName, price, quantity) {
    const existingProduct = cart.find(item => item.name === productName);
    if (existingProduct) {
        existingProduct.quantity += quantity; // Increase quantity if already in cart
    } else {
        cart.push({ name: productName, quantity: quantity, price: price }); // Add new product to cart
    }
    localStorage.setItem('cart', JSON.stringify(cart)); // Save updated cart to localStorage
    alert(`${quantity} x ${productName} has been added to the cart!`); // Simple alert for confirmation
}

// Event listener for "ADD TO CART" button
document.addEventListener('click', function(event) {
    if (event.target.matches('.add-to-cart')) {
        const productName = event.target.getAttribute('data-product-name'); // Get product name
        const price = parseFloat(event.target.getAttribute('data-product-price')); // Get product price as a float
        const quantityInput = event.target.parentElement.querySelector('.quantity-input'); // Get the corresponding quantity input
        const quantity = parseInt(quantityInput ? quantityInput.value : 1); // Default quantity to 1 if not present
        addToCart(productName, price, quantity); // Call function to add product to cart
    }
});
