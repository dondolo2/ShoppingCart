let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'BUNNYCHOW',
        image: '7.jpg',
        price: 120.00
    },
    {
        id: 2,
        name: 'BREAKFAST',
        image: '8.jpg',
        price: 130.00
    },
    {
        id: 3,
        name: 'MOGODU',
        image: '9.jpg',
        price: 220.00
    },
    {
        id: 4,
        name: 'BEEF STEW',
        image: '10.jpg',
        price: 125.00
    },
    {
        id: 5,
        name: 'CHAKALAKA CHICKEN',
        image: '11.jpg',
        price: 150.00
    },
    {
        id: 6,
        name: 'BRAAI MIX',
        image: '12.jpg',
        price: 160.00
    },
];
let listCards = [];
function initApp() {
    products.forEach((value, key)=>{
        let newDiv = document.createElement('div');   
        newDiv.classList.add('item');
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

function addToCart(key){
    if(listCards[key] == null){
        listCards[key] = products[key];
        listCards[key].quantity = 1;
    }
    reloadCart();
}

function reloadCart() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;

        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>${value.quantity}</div>
                <div>
                        <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                        <div class="count">${value.quantity}</div>
                        <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                    </div>
            `;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    }
    else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCart();
}



































