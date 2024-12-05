const displayCartItems = () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    cartItemsContainer.innerHTML = ''; // Clear existing items
    
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = 0; // Initialize total price
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<li class="list-group-item">Your cart is empty.</li>';
        totalPriceElement.textContent = `Total Price: $0.00`; // Update total price
        return;
    }
    
    // Loop through cart items and display them
    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        
        // Create item description with price
        const orgPrice = item.price;
        const itemPrice = (item.price * item.quantity).toFixed(2); // Calculate item price
        const itemDescription = document.createElement('span');
        itemDescription.textContent = `${item.name} [$${orgPrice} Per] (Quantity: ${item.quantity}) - $${itemPrice}`; // Show item price
        
        // Update total price
        totalPrice += item.price * item.quantity; // Accumulate the total price
        
        // Create quantity adjustment buttons
        const quantityControl = document.createElement('div');
        quantityControl.className = 'd-flex align-items-center';
        
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.className = 'btn btn-neg btn-sm';
        decreaseButton.onclick = () => updateQuantity(index, -1);
        
        const quantityDisplay = document.createElement('span');
        quantityDisplay.className = 'quantity';
        quantityDisplay.textContent = item.quantity;
        
        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.className = 'btn btn-plus btn-sm';
        increaseButton.onclick = () => updateQuantity(index, 1);
        
        // Append buttons and quantity display to quantityControl
        quantityControl.appendChild(decreaseButton);
        quantityControl.appendChild(quantityDisplay);
        quantityControl.appendChild(increaseButton);
        
        // Append item description and quantity control to list item
        listItem.appendChild(itemDescription);
        listItem.appendChild(quantityControl);
        
        // Create remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'btn btn-danger btn-sm ms-2';
        removeButton.onclick = () => removeItemFromCart(index);
        
        // Append remove button to list item
        listItem.appendChild(removeButton);
        cartItemsContainer.appendChild(listItem);
    });
    
    // Apply 10% discount if user signed up
    if (localStorage.getItem('discountApplied')) {
        const TotalItemsPrice = totalPrice
        const discount = totalPrice * 0.10;
        totalPrice -= discount;
        totalPriceElement.textContent= `Total Price = ${TotalItemsPrice}$ with 10% discount = ${totalPrice.toFixed(2)}$`
        
    } else {
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }
};

// Function to update quantity
const updateQuantity = (index, change) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart[index].quantity += change;

    if (cart[index].quantity < 1) {
        cart[index].quantity = 1; // Prevent negative quantities
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh the cart display
};

// Function to remove an item from the cart
const removeItemFromCart = (index) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1); // Remove the item from the cart
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems(); // Refresh the cart display
};


function togglePaymentMethod() {
    // Get the selected payment method
    const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
    
    // Get the credit card input elements
    const creditCardInfo = document.getElementById("credit-card-info");
    const ccNameInput = document.getElementById("cc-name");
    const ccNumberInput = document.getElementById("cc-number");
    
    // Enable or disable credit card inputs based on payment method
    if (paymentMethod === "credit-card") {
        creditCardInfo.style.display = "block";  // Show credit card fields
        CardNameInput.disabled = false;           // Enable credit card fields
        ccNumberInput.disabled = false;
    } else {
        creditCardInfo.style.display = "none";   // Hide credit card fields
        nameInput.disabled = true;             // Disable credit card fields
        numberInput.disabled = true;
    }
}

// Checkout process
document.getElementById('checkoutForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting

    alert('Thanks for choosing us!'); // Checkout completion message
    document.getElementById("checkoutForm").reset(); // Clear all form inputs
    localStorage.removeItem('discountApplied'); // Remove discount after purchase
    localStorage.removeItem('cart'); // Clear the cart
    displayCartItems();
});

// Call display function when cart page is loaded
document.addEventListener('DOMContentLoaded', displayCartItems);
