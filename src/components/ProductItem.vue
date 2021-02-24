<template>
   <li class="catalog__item">
      <a class="catalog__pic" href="#">
        <img :src="computedImage"  alt="Название товара">
      </a>
        <h3 class="catalog__title">
          <a href="#">
            {{product.title}}
          </a>
        </h3>
        <span class="catalog__price">
          {{product.price}} ₽
        </span>
        <ProductColors
        :current-color.sync="currentColorId"
        :colors="colors"
        />
    </li>
</template>
<script>
import ProductColors from './ProductColors.vue'
export default {
  data () {
    return {
      currentColorId: this.product.colors[0].color.id
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    ProductColors
  },
  computed: {
    computedImage () {
      const color = this.product.colors.find(c => c.color.id === this.currentColorId)
      return color.gallery[0].file.url
    },
    colors () {
      return this.product.colors.map(c => c.color)
    }
  }
}
</script>
