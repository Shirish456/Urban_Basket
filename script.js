let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, qtyId) {

    let qty = document.getElementById(qtyId).value;

    cart.push({
        name: name,
        price: price,
        quantity: qty
    });

    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cartCount").innerText = cart.length;

    alert("Item Added to Cart!");
}

if(document.getElementById("cartItems")) {

    let cartItemsDiv = document.getElementById("cartItems");
    let total = 0;

    cart.forEach(item => {
        let div = document.createElement("div");
        div.innerHTML = item.name + " - ₹" + item.price +
            " x " + item.quantity;
        cartItemsDiv.appendChild(div);

        total += item.price * item.quantity;
    });

    document.getElementById("totalPrice").innerText = total;
}