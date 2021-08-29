const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = [...data];
                this.render()
            });
    }

    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new ProductItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

    sumPrice() {
        let result = 0;
        for (let item of this.goods) {
            result += item.price;
        }
        return result;
        // return this.allProducts.reduce((accum, item) => accum += item.price, 0);
        // console.log(result);
    }
}

class ProductItem {
    constructor(product, img = 'images/CartSVG.svg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item">
                <h3>${this.title}</h3>
                <img src="${this.img}">
                <p>${this.price} $</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//класс корзины
class Cart {
    constructor(container = '.cart') {
        this.container = container;
        this.goods = [];
        this._showCart();
        this._getCartProducts()
            .then(data => {
                this.goods = [...data.contents];
                this.render();
            });
    }

    _getCartProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }

    _showCart() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle("invisible");
        });
    }

    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const item = new CartItem(product);
            block.insertAdjacentHTML("beforeend", item.render());
        }
    }

};

//класс товара в корзине
class CartItem {
    constructor(product, img = 'images/CartSVG.svg') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
        this.quantity = product.quantity;
    }
    render() {
        return `<div class="product-item">
                <img src="${this.img}">
                <div class="product-name">
                <h3 class="title">${this.title}</h3>
                <p class="price">${this.price} $</p>
                </div>
                <p class="quantity">${this.quantity} шт. на сумму ${this.price * this.quantity} $</p>
                <button class="delete-btn">X</button>
                <button class="add-btn">+</button>
                <button class="remove-btn">-</button>
            </div>`
    }
};

let list = new ProductList();
let cart = new Cart();