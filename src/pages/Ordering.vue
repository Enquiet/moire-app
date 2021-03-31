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
            <FormText placeholder="Введите ваше полное имя" type="text" title-input="ФИО" v-model="createOrder.name" />
            <FormText placeholder="Введите ваш адрес" type="text" title-input="Адрес доставки" v-model="createOrder.address" />
            <FormText placeholder="Введите ваш телефон" type="tel" title-input="Телефон" v-model="createOrder.phone" />
            <FormText placeholder="Введи ваш Email" type="email" title-input="Email" v-model="createOrder.email" />

            <label class="form__label">
              <textarea class="form__input form__input--area" name="comments" placeholder="Ваши пожелания"></textarea>
              <span class="form__value">Комментарий к заказу</span>
            </label>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>290 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card" checked="">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
            <li class="cart__order" v-for="item in loadProductCart" :key="item.id">
              <h3>{{item.product.title}}</h3>
              <b>{{item.product.price * item.quantity}} ₽</b>
              <span>Артикул: {{item.product.id}}</span>
            </li>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>бесплатно</b></p>
            <p>Итого: <b>{{loadProductCart.length}}</b> товара на сумму <b>{{totalCartProduct}} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit" >
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>
<script>
import FormText from '@/components/FormText.vue'
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
      error: {}
    }
  },
  components: {
    FormText
  },
  computed: {
    ...mapState('baskets', ['cartProductData']),
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
    }
  },
  methods: {
    ...mapActions('order', ['orderLoadingData']),
    async addOrder () {
      try {
        await this.orderLoadingData(this.order)
      } catch (e) {
        console.log(e.response.error.request)
        this.error = 0
      }
    }
  }
}
</script>
