<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">Каталог</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">Корзина</a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">Оформление заказа</a>
        </li>
      </ul>
      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderData.id}}</span>
      </h1>
    </div>

  <section class="cart">
    <form class="cart__form form" action="#" method="POST">
      <div class="cart__field">
        <p class="cart__message">
          Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет письмо с&nbsp;деталями заказа.
          Наши менеджеры свяжутся с&nbsp;Вами в&nbsp;течение часа для уточнения деталей доставки.
        </p>

        <ul class="dictionary">
          <li class="dictionary__item">
            <span class="dictionary__key">
              Получатель
            </span>
            <span class="dictionary__value">
             {{orderData.name}}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Адрес доставки
            </span>
            <span class="dictionary__value">
              {{orderData.address}}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Телефон
            </span>
            <span class="dictionary__value">
              {{orderData.phone}}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Email
            </span>
            <span class="dictionary__value">
              {{orderData.email}}
            </span>
          </li>
          <li class="dictionary__item">
            <span class="dictionary__key">
              Способ оплаты
            </span>
            <span class="dictionary__value">
              {{orderData.paymentType}}
            </span>
          </li>
        </ul>
      </div>
      <OrderProductInfo
        :product-list="basket"
        :price-delivery="price"
        :total-price="orderData.totalPrice"
      />
    </form>
  </section>
</main>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import OrderProductInfo from '@/components/OrderProductInfo.vue'
export default {
  components: {
    OrderProductInfo
  },
  computed: {
    ...mapState('order', ['orderData']),
    id () {
      return {
        id: this.$route.params.id
      }
    },
    basket () {
      return this.orderData.basket ? this.orderData.basket.items : []
    },
    price () {
      return this.orderData.deliveryType ? Number(this.orderData.deliveryType.price) : 0
    }
  },
  methods: {
    ...mapActions('order', ['orderMadeData']),
    async  getOrderInfoId () {
      try {
        await this.orderMadeData(this.id)
      } catch (e) {
        console.log(e)
      }
    }
  },
  async created () {
    await this.orderMadeData(this.id)
  },
  watch: {
    '$route.params.id': {
      async handler () {
        await this.orderMadeData(this.id)
      }
    }
  }
}
</script>
