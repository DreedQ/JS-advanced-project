Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `
        <div class="cart-block" v-show="visibility">
            <cart-item v-for="item of cartItems" :key="item.id_product" :img="img" :cart-item="item">
            </cart-item>
        </div>
    `
});

Vue.component('cart-item', {
    props: ['img', 'cartItem'],
    template: `
        <div class="cart-item">
            <img :src="img" alt="Some img">
            <div class="product-bio">
                <div class="desc">
                    <div class="product-title">{{ cartItem.product_name }}</div>
                    <div class="product-quantity">Кол-во: {{ cartItem.quantity }} шт.</div>
                    <div class="product-single-price">{{ cartItem.price }} р/шт.</div>
                </div>
            </div>
            <div class="right-block">
                <div class="product-price">Стоимость: {{cartItem.quantity*cartItem.price}} р.</div>
                <button class="buy-btn" @click="$parent.$emit('add-product', cartItem)">Добавить +1</button>
                <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                
            </div>
        </div>
    `
})