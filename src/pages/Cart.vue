<template>
  <div class="cart-error" v-if="!loadProductCart.length">
    <h1 class="cart-error__title">В вашей корзине нет товара </h1>
    <router-link class="cart-error__btn" :to="{name:'main'}">Вернуться в котолок</router-link>
  </div>
  <main class="content container" v-else>
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Корзина
        </h1>
        <span class="content__info">
          {{loadProductCart.length}} товара
        </span>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
           <CartItem
            v-for="product in loadProductCart" :key="product.id"
            :product="product"
           />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>4 070 ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import CartItem from '@/components/CartItem.vue'
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('baskets', ['cartProductData']),
    loadProductCart () {
      return this.cartProductData.items ? this.cartProductData.items : []
    }
  },
  components: {
    CartItem
  }
}
</script>
<style lang="scss" scoped>
  .cart-error{
    margin: 50px 0;
    text-align: center;
    &__title{
      font-size: 60px;
      color: #9d9d9d;
    }
    &__btn{
      display: block;
      margin: 0 auto;
      margin-top: 30px;
      border-radius: 5px;
      border: 2px solid #9d9d9d;
      max-width: 280px;
      padding: 20px;
      font-size: 24px;
      line-height: 28px;
      color: #9d9d9d;
      transition: .3s;
      &:hover{
         transition: .3s;
        color:#e02d71;
        border-color: #e02d71;
      }
    }
  }
</style>
