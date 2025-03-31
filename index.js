// Select cart elements
const cartItemsContainer = document.querySelector(".cart-items");
const cartTotalElement = document.querySelector(".cart-total");
const checkoutButton = document.querySelector(".checkout-btn");

// Initialize cart
let cart = [];

// Function to add item to cart
function addToCart(productName, productPrice) {
    const existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}

// Function to update cart UI
function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <span>${item.name} (x${item.quantity})</span>
            <span>₹${item.price * item.quantity}</span>
            <button class="remove-btn" onclick="removeFromCart('${item.name}')">X</button>
        `;
        cartItemsContainer.appendChild(cartItem);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = Total: ₹${total};
}

// Function to remove item from cart
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    updateCart();
}

// Function for checkout process
checkoutButton.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
    } else {
        alert("Thank you for your purchase!");
        cart = [];
        updateCart();
    }
});

// Attach event listeners to all "Add to Cart" buttons
document.querySelectorAll(".product button").forEach(button => {
    button.addEventListener("click", (event) => {
        const productCard = event.target.closest(".product");
        const productName = productCard.querySelector("h2").textContent;
        const productPrice = parseFloat(productCard.querySelector("p").textContent.replace("₹", ""));
        
        addToCart(productName, productPrice);
    });
});
