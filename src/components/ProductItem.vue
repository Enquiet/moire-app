<template>
   <li class="catalog__item">
        <a class="catalog__pic" href="#">
          <img src="img/radio.jpg" srcset="img/radio@2x.jpg 2x" alt="Название товара">
        </a>
        <h3 class="catalog__title">
          <a href="#">
            {{product.title}}
          </a>
        </h3>
        <span class="catalog__price">
          {{product.price}} ₽
        </span>
        <ul class="colors colors--black">
          <ProductColor  v-for="color in product.colors" :key="color.id"/>
        </ul>
      </li>
</template>
<script>
import ProductColor from './ProductColor.vue'
export default {
  props: {
    product: {
      type: Object,
      default: () => []
    }
  },
  components: {
    ProductColor
  }
}
</script>
