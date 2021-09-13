Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                for (let item of data) {
                    item.imgProduct = `./images/${item.id_product}.png`;
                    this.$data.products.push(item);
                    this.$data.filtered.push(item);
                }
            });
    },
    methods: {
        filter(userSearch) {
            let regexp = new RegExp(userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img="item.imgProduct"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`
});
Vue.component('product', {
    props: ['product', 'img'],
    template: `
           <article class="product__inner">
                    <div class="product__card">
                        <img class="product__img" :src="img" alt="Some img">
                        <div class="overlay">
                            <button class="add__tocart" @click="$emit('add-product', product)">
                        <img src="images/chart.svg" alt="Cart" />Add to Cart
                            </button>
                        </div>
                    </div>

                    <div class="product__description">
                        <h3><a class="product__name" href="#" @click="$emit('add-product', product)">{{product.product_name}}</a></h3>
                        <p class="product__descr">
                            Known for her sculptural takes on traditional tailoring, Australian arbiter of cool Kym Ellery teams up with Moda Operandi.
                        </p>
                        <span class="product__price">{{product.price}} p.</span>
                    </div>
            </article>
    `
})

/* <div class="product-item">
<img :src="img" alt="Some img">
<div class="desc">
    <h3>{{product.product_name}}</h3>
    <p>{{product.price}}</p>
    <button class="buy-btn" @click="$emit('add-product', product)">Купить</button>
</div>
</div> */