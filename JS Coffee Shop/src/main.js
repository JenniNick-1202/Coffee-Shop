let shop = document.getElementById("shop");



let basket = JSON.parse(localStorage.getItem("basket")) || [];


let generateShop = () => {
    return (shop.innerHTML = shopItems.map((x) => {
        let { id, name, price, desc, img } = x; 
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
            <img src=${img} alt=${name} width="220" height="220">
            <div class="detail">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="priceQty">
                    <h2>£${price.toFixed(2)}</h2>
                    <div class="buttons">
                        <i onclick="minus(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item === undefined ? 0 : search.item}</div>
                        <i onclick="add(${id})" class="bi bi-plus-lg"></i>      
                    </div>
                </div>
            </div>
        </div>
        `;
    })
    .join(""));
};

generateShop();

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
    localStorage.setItem("basket", JSON.stringify(basket));
};

let update = (id)=> {
let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

let calculation =() => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();