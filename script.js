// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ---------------- ADD TO CART ---------------- */

function addToCart(button) {

    let card = button.closest(".card");

    let name = card.querySelector(".product-title").innerText;

    let priceText = card.querySelector(".price").innerText;
    let price = parseInt(priceText.replace("₹", "").trim());

    let qty = parseInt(card.querySelector(".qty-input").value);

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {
        existingProduct.quantity += qty;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: qty
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

    alert(name + " added successfully ✅");
}
/* ---------------- UPDATE CART COUNT ---------------- */

function updateCartCount() {
    let count = cart.reduce((total, item) => total + item.quantity, 0);

    let cartCountElement = document.getElementById("cartCount");

    if (cartCountElement) {
        cartCountElement.innerText = count;
    }
}

/* ---------------- QUANTITY CONTROL ---------------- */

function increaseQty(button) {
    let input = button.parentElement.querySelector(".qty-input");
    input.value = parseInt(input.value) + 1;
}

function decreaseQty(button) {
    let input = button.parentElement.querySelector(".qty-input");

    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

/* ---------------- SEARCH FUNCTION ---------------- */

function searchProducts() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        let title = card.querySelector(".product-title").innerText.toLowerCase();

        if (title.includes(input)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

/* ---------------- CART PAGE LOGIC ---------------- */

if (document.getElementById("cartItems")) {

    let cartItemsDiv = document.getElementById("cartItems");
    let total = 0;

    cart.forEach(item => {

        let div = document.createElement("div");
        div.innerHTML = `${item.name} - ₹${item.price} x ${item.quantity}`;

        cartItemsDiv.appendChild(div);

        total += item.price * item.quantity;
    });

    document.getElementById("totalPrice").innerText = total;
}

/* ---------------- ON PAGE LOAD ---------------- */

document.addEventListener("DOMContentLoaded", function () {
    updateCartCount();
});