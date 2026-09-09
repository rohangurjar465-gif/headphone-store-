// ============================
// PRODUCT CLICK + ADD TO CART
// ============================

let products = document.querySelectorAll(".product-card");

products.forEach(function (product) {

  // IMAGE CLICK → PRODUCT DETAIL

  let productImage = product.querySelector(".product-img");

  if (productImage) {
    productImage.addEventListener("click", function () {

      let image = product.querySelector(".product-img").src;
      let name = product.querySelector(".product-name").textContent.trim();
      let price = product.querySelector(".product-price").textContent.trim();

      localStorage.setItem("productImage", image);
      localStorage.setItem("productName", name);
      localStorage.setItem("productPrice", price);

      window.location.href = "product-detail.html";
    });
  }


  // ADD TO CART FROM SHOP PAGE

  let addButton = product.querySelector(".add-cart");

  if (addButton) {

    addButton.addEventListener("click", function () {

      let image = product.querySelector(".product-img").src;
      let name = product.querySelector(".product-name").textContent.trim();
      let price = product.querySelector(".product-price").textContent.trim();

      price = Number(
        price.replace("₹", "").replace(",", "").trim()
      );

      addProductToCart(image, name, price, 1);

    });
  }

});


// ============================
// ADD PRODUCT TO CART FUNCTION
// ============================

function addProductToCart(image, name, price, quantity) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let productData = {
    image: image,
    name: name,
    price: price,
    quantity: quantity
  };

  cart.push(productData);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartTotal();
  updateCartPopup();
}


// ============================
// PRODUCT DETAIL PAGE
// ADD TO CART
// ============================

let detailButton = document.querySelector("#addToCartBtn");

if (detailButton) {

  detailButton.addEventListener("click", function () {

    let image = localStorage.getItem("productImage");
    let name = localStorage.getItem("productName");
    let price = localStorage.getItem("productPrice");

    price = Number(
      price.replace("₹", "").replace(",", "").trim()
    );


    let quantityInput = document.querySelector(
      ".product-detail-page input[type='number']"
    );

    let quantity = Number(quantityInput.value);


    addProductToCart(
      image,
      name,
      price,
      quantity
    );

  });

}


// ============================
// NAVBAR CART TOTAL
// ============================

function updateCartTotal() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach(function (item) {

    total = total + item.price * item.quantity;

  });


  let cartTotal = document.querySelector("#cartTotal");

  if (cartTotal) {

    cartTotal.textContent =
      "Cart/₹" + total.toFixed(2);

  }

}


// Page load

updateCartTotal();


// ============================
// SORTING
// ============================

let sortBox = document.querySelector("select");

let productList = document.querySelector(".row.g-4");


if (sortBox && productList) {

  sortBox.addEventListener("change", function () {

    let boxes = Array.from(productList.children);


    boxes.sort(function (a, b) {

      let priceA = Number(
        a
          .querySelector(".product-price")
          .textContent
          .replace("₹", "")
          .replace(",", "")
      );


      let priceB = Number(
        b
          .querySelector(".product-price")
          .textContent
          .replace("₹", "")
          .replace(",", "")
      );


      if (sortBox.value.includes("low")) {

        return priceA - priceB;

      } else {

        return priceB - priceA;

      }

    });


    boxes.forEach(function (box) {

      productList.appendChild(box);

    });

  });

}


// ============================
// CART POPUP
// ============================

function updateCartPopup() {

  let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


  let popups =
    document.querySelectorAll(".cart-popup");


  for (let p = 0; p < popups.length; p++) {

    let popupProducts =
      popups[p].querySelector("#popupProducts");


    let popupSubtotal =
      popups[p].querySelector("#popupSubtotal");


    if (!popupProducts || !popupSubtotal) {
      continue;
    }


    popupProducts.innerHTML = "";


    let total = 0;


    for (let i = 0; i < cart.length; i++) {

      let item = cart[i];


      total =
        total + item.price * item.quantity;


      popupProducts.innerHTML += `

        <div class="popup-product">

          <img src="${item.image}" alt="${item.name}">

          <div class="popup-product-info">

            <p>${item.name}</p>

            <span>
              ${item.quantity} × ₹${item.price.toFixed(2)}
            </span>

          </div>


          <button
            type="button"
            class="remove-popup-item"
            data-index="${i}">
            &times;
          </button>

        </div>

      `;

    }


    if (cart.length === 0) {

      popupProducts.innerHTML =
        "<p>No products in the cart.</p>";

    }


    popupSubtotal.textContent =
      "₹" + total.toFixed(2);

  }

}


// ============================
// CART POPUP OPEN / CLOSE
// ============================

let cartBoxes =
  document.querySelectorAll(".cart-box");


for (let i = 0; i < cartBoxes.length; i++) {

  let cartBox = cartBoxes[i];

  let popup =
    cartBox.querySelector(".cart-popup");


  if (!popup) {
    continue;
  }


  // CART CLICK

  let cartLink =
    cartBox.querySelector("a");


  if (cartLink) {

    cartLink.addEventListener("click", function (event) {

      event.preventDefault();

      updateCartPopup();

      popup.classList.toggle("show");

    });

  }


  // MOUSE HOVER

  cartBox.addEventListener("mouseenter", function () {

    updateCartPopup();

    popup.classList.add("show");

  });


  cartBox.addEventListener("mouseleave", function () {

    popup.classList.remove("show");

  });


  // REMOVE PRODUCT

  popup.addEventListener("click", function (event) {

    if (
      !event.target.classList.contains(
        "remove-popup-item"
      )
    ) {
      return;
    }


    let cart =
      JSON.parse(localStorage.getItem("cart")) || [];


    let itemIndex =
      event.target.getAttribute("data-index");


    cart.splice(itemIndex, 1);


    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );


    updateCartTotal();

    updateCartPopup();

  });

}


updateCartPopup();