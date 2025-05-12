let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");
let openShoppingCart = document.querySelector(".openCartBtn");

openShopping.addEventListener("click", () => {
  body.classList.add("active");
});
closeShopping.addEventListener("click", () => {
  body.classList.remove("active");
});

let products = [
  {
    id: 1,
    name: "Pulled Meat and Vegetables",
    image: "1.PNG",
    price: 120.0,
  },
  {
    id: 2,
    name: "Wings with Chilli Sauce",
    image: "2.PNG",
    price: 130.0,
  },
  {
    id: 3,
    name: "Grilled Salmon Salad",
    image: "3.PNG",
    price: 170.0,
  },
  {
    id: 4,
    name: "Pumpkin Soup",
    image: "4.PNG",
    price: 125.0,
  },
  {
    id: 5,
    name: "Fresh Green Salad",
    image: "5.PNG",
    price: 150.0,
  },
  {
    id: 6,
    name: "Pepperoni Pizza",
    image: "6.PNG",
    price: 160.0,
  },
];
let listCards = [];
function initApp() {
  products.forEach((value, key) => {
    let newDiv = document.createElement("div");
    newDiv.classList.add("item");
    newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}</div>
            <button onclick="addToCart(${key})" aria-label="Add ${
      value.name
    } to cart">Add To Cart</button>
        `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = { ...products[key] }; // clone to avoid reference issues
    listCards[key].quantity = 1;
  }
  reloadCart();
  showFeedback();
}

function showFeedback() {
  const feedback = document.querySelector(".feedback");
  feedback.classList.add("show");
  setTimeout(() => {
    feedback.classList.remove("show");
  }, 1500);
}

function reloadCart() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  let emptyMessage = document.querySelector(".emptyMessage");

  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="img/${value.image}" alt="${value.name}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                        <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })" aria-label="Decrease quantity of ${value.name}">-</button>

                        <div class="count">${value.quantity}</div>
                        
                        <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })" aria-label="Increase quantity of ${value.name}">+</button>
                </div>

                <div>
                    <button class="removeBtn" onclick="removeFromCart(${key})" aria-label="Remove ${
        value.name
      } from cart">Remove</button>
                </div>
            `;
      listCard.appendChild(newDiv);
    }
  });

  // Show or hide empty cart message
  if (count === 0) {
    emptyMessage.style.display = "flex";
  } else {
    emptyMessage.style.display = "none";
  }

  total.innerText = "R " + totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCart();
}

function removeFromCart(key) {
  delete listCards[key];
  reloadCart();
}

document.querySelector(".overlay").addEventListener("click", () => {
  body.classList.remove("active");
});

document.querySelector(".continueBtn").addEventListener("click", () => {
  body.classList.remove("active");
});

//ACCESSIBILITY
openShopping.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    body.classList.add("active");

    // Wait for cart to be visible before trapping focus
    setTimeout(() => {
      const cart = document.querySelector(".card");
      trapFocus(cart, true); // Enable focus
      cart.querySelector(".closeShopping").focus(); // focus something in cart
    }, 100);
  }
});

document.querySelector(".closeShopping").addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    body.classList.remove("active");

    const cart = document.querySelector(".card");
    trapFocus(cart, false); // Disable focus

    openShopping.focus(); // Send focus back to trigger // Return focus to open button
  }
});

function trapFocus(container, enable) {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElements.forEach((el) => {
    if (enable) {
      el.removeAttribute("tabindex");
    } else {
      el.setAttribute("tabindex", "-1"); // Make them not focusable
    }
  });

  if (!enable) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  container.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }
  });
}
