<template>
  <section class="catalog">
    <ul class="catalog__list">
     <ProductItem
     :product="products"
     v-for="products in productList"
     :key="products.id"
     />
    </ul>
  </section>
</template>

<script>
import ProductItem from './ProductItem.vue'

export default {
  props: {
    productList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ProductItem
  }
}
</script>
