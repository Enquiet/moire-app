<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <div class="content__row">
        <h1 class="content__title">
          Оформление заказа
        </h1>
      </div>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="addOrder">
        <div class="cart__field">
          <div class="cart__data">
            <FormText placeholder="Введите ваше полное имя" type="text" title-input="ФИО"  :error="error.name" v-model="createOrder.name" />
            <FormText placeholder="Введите ваш адрес" type="text" title-input="Адрес доставки" :error="error.address" v-model="createOrder.address" />
            <FormText placeholder="Введите ваш телефон" type="tel" title-input="Телефон" :error="error.phone" v-model="createOrder.phone" />
            <FormText placeholder="Введи ваш Email" type="email" title-input="Email" :error="error.email" v-model="createOrder.email" />
            <FormAreatext placeholder="Ваши пожелания" type="text" title-input="Комментарий к заказу" v-model="createOrder.comment" />
          </div>

          <div class="cart__options">
            <FormWays :item-ways="deliverieData" :ways-id.sync="createOrder.deliveryTypeId" title-wais="Доставка"/>
            <FormWays :item-ways="paymentsData" :ways-id.sync="createOrder.paymentTypeId" title-wais="Оплата"/>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders" v-if="loadProductCart.length">
            <li class="cart__order" v-for="item in loadProductCart" :key="item.id">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price * item.quantity}} ₽</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>{{priceDelivery}}</b></p>
            <p>Итого: <b>{{loadProductCart.length}}</b> товара на сумму <b>{{totalPrice}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" >
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block" v-if="errorMessage">
          <h4>Заявка не отправлена!</h4>
          <p>
            {{errorMessage}}
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import FormText from '@/components/FormText.vue'
import FormAreatext from '@/components/FormAreatext.vue'
import FormWays from '@/components/FormWays.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      createOrder: {
        name: '',
        address: '',
        phone: '',
        email: '',
        deliveryTypeId: 0,
        paymentTypeId: 0,
        comment: ''
      },
      error: {},
      errorMessage: ''
    }
  },
  components: {
    FormText, FormWays, FormAreatext
  },
  computed: {
    ...mapState('baskets', ['cartProductData']),
    ...mapState('order', ['deliverieData', 'paymentsData']),
    ...mapGetters('baskets', ['totalCartProduct']),
    loadProductCart () {
      return this.cartProductData.items ? this.cartProductData.items : []
    },
    order () {
      return {
        name: this.createOrder.name,
        address: this.createOrder.address,
        phone: this.createOrder.phone,
        email: this.createOrder.email,
        deliveryTypeId: this.createOrder.deliveryTypeId,
        paymentTypeId: this.createOrder.paymentTypeId,
        comment: this.createOrder.comment
      }
    },
    priceDelivery () {
      const delivery = this.deliverieData.find(p => p.id === this.createOrder.deliveryTypeId)
      return delivery.price
    },
    totalPrice () {
      return this.totalCartProduct + Number(this.priceDelivery)
    },
    deliveryId () {
      return { deliveryTypeId: this.createOrder.deliveryTypeId }
    }
  },
  methods: {
    ...mapActions('order', ['orderLoadingData', 'deliverieLoadingData', 'paymentsLoadingData']),
    async addOrder () {
      try {
        this.error = {}
        this.errorMessage = ''
        await this.orderLoadingData(this.order)
      } catch (e) {
        this.error = e.request || {}
        this.errorMessage = e.message || ''
      }
    }
  },
  async created () {
    await this.deliverieLoadingData()
    this.createOrder.deliveryTypeId = this.deliverieData[0].id
    await this.paymentsLoadingData(this.deliveryId)
  },
  watch: {
    'createOrder.deliveryTypeId': {
      async handler () {
        await this.paymentsLoadingData(this.deliveryId)
      }
    }
  }
}
</script>
