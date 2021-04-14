<template>
  <div class="cart__block">
    <ul class="cart__orders" v-if="productList.length">
      <li class="cart__order" v-for="item in productList" :key="item.id">
        <h3>{{item.product.title}}</h3>
        <b>{{item.product.price * item.quantity}} ₽</b>
        <span>Артикул: {{item.product.id}}</span>
      </li>
    </ul>

    <div class="cart__total">
      <p>Доставка: <b>{{priceDelivery}}</b></p>
      <p>Итого: <b>{{productList.length}}</b> товара на сумму <b>{{totalPrice}} ₽</b></p>
    </div>

    <button class="cart__button button button--primery" type="submit" v-if="this.$route.name === 'ordering'" >
      Оформить заказ
    </button>
  </div>
</template>
<script>
export default {
  props: {
    productList: {
      type: Array,
      default: () => []
    },
    totalPrice: {
      type: Number,
      default: 0
    },
    priceDelivery: {
      type: Number,
      default: 0
    }
  }
}
</script>
