class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this._fetchProducts();
        this.render(); //вывод товаров на страницу
        this.sumPrice();
    }
    _fetchProducts() {
        this.goods = [
            { id: 1, title: 'Notebook', price: 2000 },
            { id: 2, title: 'Mouse', price: 20 },
            { id: 3, title: 'Keyboard', price: 200 },
            { id: 4, title: 'Gamepad', price: 50 },
        ];
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
        // console.log(result);
    }
}

class ProductItem {
    constructor(product, img = 'images/CartSVG.svg') {
        this.title = product.title;
        this.id = product.id;
        this.price = product.price;
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

let list = new ProductList();

//класс корзины
// class Cart {
//     sumCartPrice();  //суммарная стоимость товаров в корзине
//     clearCart();     //очистка корзины
//     renderCart();    //вывод корзины на экран
// };

//класс товара в корзине
// class CartItem {
//     increaseItem();  //уменьшить количество товара
//     removeItem();    //удалить товар из корзины
//     decreaseItem();  //увеличить количество товара
//     quantityItem();  //общее количество товаров одного вида
//     sumPriceItem();  //сумма за товары одного вида
// };













// const products = [
//     { id: 1, title: 'Notebook', price: 2000 },
//     { id: 2, title: 'Mouse', price: 20 },
//     { id: 3, title: 'Keyboard', price: 200 },
//     { id: 4, title: 'Gamepad', price: 50 },
// ];
// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <h3>${item.title}</h3>
//                 <img src="images/CartSVG.svg">
//                 <p>${item.price} $</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join("");
// };

// renderPage(products);