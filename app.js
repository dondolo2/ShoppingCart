let openShopping = document.querySelector(".shopping");
let closeShopping = document.querySelector(".closeShopping");
let list = document.querySelector(".list");
let listCard = document.querySelector(".listCard");
let body = document.querySelector("body");
let total = document.querySelector(".total");
let quantity = document.querySelector(".quantity");

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
            <button onclick="addToCart(${key})">Add To Cart</button>
        `;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = products[key];
    listCards[key].quantity = 1;
  }
  reloadCart();
}

function reloadCart() {
  listCard.innerHTML = "";
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;

    if (value != null) {
      let newDiv = document.createElement("li");
      newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                        <button onclick="changeQuantity(${key}, ${
        value.quantity - 1
      })">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${
        value.quantity + 1
      })">+</button>
                    </div>
            `;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
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

document.querySelector(".overlay").addEventListener("click", () => {
  body.classList.remove("active");
});
