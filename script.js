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
    showToast(name + " added to cart ✅");
}
/* ---------------- UPDATE CART COUNT ---------------- */
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let totalItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    let cartBadge = document.getElementById("cartCount");
    if (cartBadge) {
        cartBadge.innerText = totalItems;
    }
}
document.addEventListener("DOMContentLoaded", function() {
    updateCartCount();
});

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

    cartItemsDiv.innerHTML = "";

    cart.forEach((item, index) => {

        let subtotal = item.price * item.quantity;
        total += subtotal;

        // convert product name to image filename
        let imageName = item.name.toLowerCase().replace(/ /g, "_");

        cartItemsDiv.innerHTML += `
            <tr>
                <td>
                    <img src="images/${imageName}.jpg" 
                         class="cart-product-img">
                </td>
                <td>${item.name}</td>
                <td>₹ ${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹ ${subtotal}</td>
                <td>
                    <button onclick="removeItem(${index})" 
                            class="remove-btn">
                        Remove
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById("totalPrice").innerText = total;
    document.getElementById("itemCount").innerText =
        cart.reduce((sum, item) => sum + item.quantity, 0);
}
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
}
function goToCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    window.location.href = "checkout.html";
}
function placeOrder() {
    alert("Order Placed Successfully 🎉");

    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
function showToast(message) {
    let toast = document.getElementById("toast");
    let toastMsg = document.getElementById("toastMsg");

    toastMsg.innerText = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}