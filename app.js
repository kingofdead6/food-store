// Show clear button when typing, hide it when input is empty
document.getElementById('searchBox').addEventListener('input', function () {
    let clearButton = document.querySelector('.clear-button');
    if (this.value.length > 0) {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }
});

// Clear the search box
function clearSearch() {
    let searchBox = document.getElementById('searchBox');
    searchBox.value = '';
    filterByText();  // Reapply filtering logic to show all items
    document.querySelector('.clear-button').style.display = 'none';  // Hide clear button after clearing
}

// Filter products based on text input
function filterByText() {
    let input = document.getElementById('searchBox').value.toLowerCase();
    let items = document.querySelectorAll('.item');

    items.forEach(item => {
        let name = item.querySelector('.name').textContent.toLowerCase();
        
        // Check if the product name includes the search term
        if (name.includes(input)) {
            item.classList.add('show');
        } else {
            item.classList.remove('show');
        }
    });
}

// Show all items on initial load
window.onload = () => {
    let items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.classList.add('show');
        attachClickEvent(item);  // Attach click event to each item
    });
};

// Function to attach the click event to each product item
function attachClickEvent(item) {
    item.addEventListener('click', function () {
        const imageSrc = item.querySelector('img').src;
        const title = item.querySelector('.name').textContent;
        const description = item.querySelector('.description').textContent;
        openModal(imageSrc, title, description);  // Pass the data to openModal
    });
}

// Function to open the modal with product details
function openModal(imageSrc, title, description) {
    // Set the content in the modal
    document.getElementById('modalImage').src = imageSrc;
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalText').textContent = description;
    
    // Show the modal
    document.getElementById('productModal').style.display = 'flex';
}

// Function to close the modal
function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}


// Function to simulate adding a product to the cart
function addToCart() {
    alert("Product added to cart!");
}



// Global cart variable
let cart = [];

// Function to add item to the cart
function addToCart() {
    // Get product details
    const title = document.getElementById('modalTitle').textContent;
    const price = 20; // Replace with actual price
    const imageSrc = document.getElementById('modalImage').src;

    // Check if item is already in the cart
    const existingItem = cart.find(item => item.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        // Add new item to the cart
        cart.push({ title, price, imageSrc, quantity: 1 });
    }

    // Update the cart display
    updateCart();
}

// Function to update cart display
function updateCart() {
    const cartItemsDiv = document.getElementById('cartItems');
    const totalPriceDiv = document.getElementById('totalPrice');
    cartItemsDiv.innerHTML = ''; // Clear current cart items

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity;

        const cartItemDiv = document.createElement('div');
        cartItemDiv.className = 'cart-item';

        const itemImage = document.createElement('img');
        itemImage.src = item.imageSrc;
        cartItemDiv.appendChild(itemImage);

        const itemName = document.createElement('span');
        itemName.className = 'cart-item-name';
        itemName.textContent = `${item.title} (x${item.quantity})`;
        cartItemDiv.appendChild(itemName);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-button';
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(item.title);
        cartItemDiv.appendChild(removeButton);

        cartItemsDiv.appendChild(cartItemDiv);
    });

    totalPriceDiv.textContent = `Total: $${totalPrice.toFixed(2)}`; // Update total price

    // Show cart if not empty
    document.getElementById('cart').style.display = cart.length > 0 ? 'block' : 'none';
}

// Function to remove item from cart
function removeFromCart(title) {
    cart = cart.filter(item => item.title !== title); // Remove item
    updateCart(); // Update cart display
}

// Function for checkout (you can customize this)
function checkout() {
    alert('Checkout functionality is not implemented yet.');
}
// Function to toggle cart visibility
function toggleCart() {
    const cart = document.getElementById('cart');
    cart.style.display = (cart.style.display === 'block') ? 'none' : 'block';
}
