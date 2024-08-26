let label = document.getElementById("label")
let shoppingBasket = document.getElementById("shopping-Basket")

let basket = JSON.parse(localStorage.getItem("basket")) || [];

let calculation =() => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let generateShoppingBasket = () => {
    if (basket.length !== 0) {
        return (shoppingBasket.innerHTML = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItems.find((x) => x.id === id) || [];
                let { img, name, price } = search;
                return `
        <div class="basket-item"> 
            <img width="100" src=${img} alt=${name} />

            <div class="basket-item-details">
            <div class="title-price-x">
                <h4 class="title-price">
                    <p>${name}</p>
                    <p class="basket-item-price">£ ${price.toFixed(2)}</p>
                </h4>
                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
            </div>
        
        <div class="basketButtons">
            <div class="buttons">
                <i onclick="minus(${id})" class="bi bi-dash-lg"></i>
                <div id=${id} class="quantity">${item}</div>
                <i onclick="add(${id})" class="bi bi-plus-lg"></i>      
            </div>
        </div>

        <h3 class="basketPrice">£ ${(item * search.price).toFixed(2)}</h3>
        </div>
        </div>
        `;
            })
            .join(""));
    } else {
        shoppingBasket.innerHTML = ``;
        label.innerHTML = `
    <h2>Basket is Empty</h2>
    <a href="index.html">
    <button class="HomeBtn">Continue Shopping</button>
    </a>
    `;
    }
};

generateShoppingBasket();

let add = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item+= 1;
}
generateShoppingBasket();
update(selectedItem.id);
    localStorage.setItem("basket", JSON.stringify(basket));
};

let minus = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
      search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    generateShoppingBasket();
    localStorage.setItem("basket", JSON.stringify(basket));
};

let update = (id)=> {
    let search = basket.find((x) => x.id === id);
        document.getElementById(id).innerHTML = search.item;
        calculation();
        totalAmt();
};

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateShoppingBasket();
    totalAmt();
    calculation();
    localStorage.setItem("basket", JSON.stringify(basket));
};

let = clearBasket = () => {
    basket = [];
    generateShoppingBasket();
    calculation();
    localStorage.setItem("basket", JSON.stringify(basket));
};

let totalAmt = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { id, item } = x;
                let search = shopItems.find((y) => y.id === id) || [];
                return item * search.price;
            })
            .reduce((x, y) => x + y, 0);
        label.innerHTML = `
            <h2>Total Due: £ ${amount.toFixed(2)}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearBasket()" class="EmptyBasket">Empty Basket</button>
        `;
    } else return;
};

totalAmt();


