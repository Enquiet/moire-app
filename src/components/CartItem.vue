<template>
  <li class="cart__item product">
    <div class="product__pic">
      <img :src="productImage" width="120" height="120"  alt="Название товара">
    </div>
    <h3 class="product__title">
      {{productInfo.title}}
    </h3>
    <p class="product__info product__info--color">
      Цвет:
      <span>
        <i :style="{background: color.code}"></i>
        {{color.title}}
      </span>
    </p>
    <span class="product__code">
      Артикул: {{productInfo.id}}
    </span>
    <Counter
      :amount-product.sync="amount"
    />
    <b class="product__price">
      {{productTotalPrice}} ₽
    </b>

    <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteProduct">
      <svg width="20" height="20" fill="currentColor">
        <use xlink:href="#icon-close"></use>
      </svg>
    </button>
  </li>
</template>
<script>
import Counter from '@/components/Counter.vue'
import { mapActions } from 'vuex'
export default {
  components: {
    Counter
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions('baskets', ['updateAmountProduct', 'deleteProductCard']),
    deleteProduct () {
      this.deleteProductCard({ basketItemId: this.product.id })
    }
  },
  computed: {
    amount: {
      get () {
        return this.product.quantity
      },
      set (val) {
        this.updateAmountProduct({
          basketItemId: this.product.id,
          quantity: val
        })
      }
    },
    color () {
      return this.product.color.color
    },
    productInfo () {
      return this.product.product
    },
    productTotalPrice () {
      return this.product.price * this.product.quantity
    },
    productImage () {
      return this.product.color.gallery[0].file.url
    }
  }
}
</script>
