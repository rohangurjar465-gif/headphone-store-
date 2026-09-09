let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let cartContainer =
document.querySelector("#cartContainer");

let cartTotals =
document.querySelector("#cartTotals");

let emptyCart =
document.querySelector("#emptyCart");


function showCart(){

cartContainer.innerHTML="";

if(cart.length===0){

cartTotals.classList.add("d-none");

emptyCart.classList.remove("d-none");

document.querySelector("#cartTotal").textContent=
"Cart/₹0.00";

return;

}

cartTotals.classList.remove("d-none");

emptyCart.classList.add("d-none");

let table=`
<div class="cart-table">

<div class="cart-head">
<div>Product</div>
<div>Price</div>
<div>Quantity</div>
<div>Subtotal</div>
</div>
`;

let total=0;

cart.forEach(function(item,index){

let subtotal=
item.price*item.quantity;

total=total+subtotal;

table+=`
<div class="cart-item">

<div class="product-cell">

<button class="remove-btn"
onclick="removeProduct(${index})">
×
</button>

<div class="cart-image">
<img src="${item.image}"
alt="${item.name}">
</div>

<div class="product-name">
${item.name}
</div>

</div>

<div>
₹${item.price.toFixed(2)}
</div>

<div>
<input
type="number"
class="quantity-input"
min="1"
value="${item.quantity}"
onchange="changeQuantity(${index},this.value)">
</div>

<div>
₹${subtotal.toFixed(2)}
</div>

</div>
`;

});

table+=`</div>`;

cartContainer.innerHTML=table;

document.querySelector("#subtotalPrice").textContent=
"₹"+total.toFixed(2);

document.querySelector("#totalPrice").textContent=
"₹"+total.toFixed(2);

document.querySelector("#cartTotal").textContent=
"Cart/₹"+total.toFixed(2);

}


function removeProduct(index){

cart.splice(index,1);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

showCart();

}


function changeQuantity(index,value){

cart[index].quantity=
Number(value);

localStorage.setItem(
"cart",
JSON.stringify(cart)
);

showCart();

}


document.querySelector("#checkoutBtn")
.addEventListener("click",function(){

window.location.href=
"checkout.html";

});


showCart();