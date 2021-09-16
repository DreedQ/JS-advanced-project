Vue.component('cart', {
    data() {
        return {
            cartUrl: '/getBasket.json',
            cartItems: [],
            cartCount: [],
            showCart: false
        }
    },
    mounted() {
        this.$parent.getJson(`/api/cart`)
            .then(data => {
                for (let item of data.contents) {
                    item.imgCart = `./images/${item.id_product}.png`;
                    this.$data.cartItems.push(item);
                }
            });

        // console.log(this.cartProps);
    },
    methods: {
        addProduct(item) {
            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data.result === 1) {
                            find.quantity++;
                            this.calcCounts()
                        }
                    })
            } else {
                const prod = Object.assign({ quantity: 1 }, item);
                this.$parent.postJson(`/api/cart`, prod)
                    .then(data => {
                        if (data.result === 1) {
                            prod.imgCart = `./images/${prod.id_product}.png`
                            this.cartItems.push(prod)
                            this.calcCounts()
                        }

                    })
            }
        },
        remove(item) {
            this.$parent.putJson(`/api/cart/${item.id_product}`, { quantity: -1 })
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--
                                this.calcCounts()
                        } else {
                            this.$parent.delJson(`/api/cart/${item.id_product}`, item);
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.calcCounts()
                        }
                    }
                })
        },
        calcCounts() {
            let amount = 0;
            let countGoods = 0;
            for (item of this.$data.cartItems) {
                countGoods += +item.quantity;
                amount += item.price * item.quantity;
            }
            this.$data.cartCount = { "amount": amount, "countGoods": countGoods };
        }
    },
    template: `<div class="cart__icon">
<button class="btn-cart" type="button" @click="showCart = !showCart"><a href="#"><img src="images/chart.svg" alt="Chart" /></a></button>
        <div class="cart-block" v-show="showCart">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="item.imgCart" :cart-item="item" @remove="remove" @addProduct="addProduct">
            </cart-item>
        </div>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
    <div class="cart-item">
                    <div class="product-bio">
                    <div class="img__container"><img :src="img" alt="Some img"></div>
                        <div class="product-desc">
                            <div class="product-title">{{ cartItem.product_name }}</div>
                            <div class="product-quantity">Количестко: {{ cartItem.quantity }}</div>
                            <div class="product-single-price">{{ cartItem.price }} р/шт.</div>
                        </div>
                    </div>
                    <div class="right-block">
                        <div class="product-price">{{cartItem.quantity*cartItem.price}} p.</div>
                        <div class="cart__btns">
                        <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        <button class="add-btn" @click="$emit('addProduct', cartItem)">+</button>
                        </div>
                    </div>
                </div>
    `
})