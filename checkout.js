// LocalStorage se cart ka data lena

let cartData =
    JSON.parse(localStorage.getItem("cart")) || [];


// HTML elements lena

let checkoutOrderItems =document.querySelector("#checkoutOrderItems");
let checkoutSubtotal = document.querySelector("#checkoutSubtotal");
let checkoutTotal =document.querySelector("#checkoutTotal");
let proced=document.querySelector(".place-order-btn");

// Total shuru me 0
let total = 0;
// Har product ke liye loop
cartData.forEach(function(item) {
    // Ek product ka subtotal

    let productSubtotal =
        Number(item.price) *
        Number(item.quantity);

    // Total me ad

    total =
        total + productSubtotal;
    // Product screen par dikhana
    checkoutOrderItems.innerHTML += `

        <div class="checkout-product">

            <span>
                ${item.name} × ${item.quantity}
            </span>

            <span>
                ₹${productSubtotal.toFixed(2)}
            </span>
        </div>
    `;
});

// procedd alrt
proced.addEventListener("click",()=>{
    alert("Successfully your order is placed 🎉 ");
})
// Subtotal dikhana

checkoutSubtotal.textContent =
    "₹" + total.toFixed(2);


// Total dikhana

checkoutTotal.textContent =
    "₹" + total.toFixed(2);