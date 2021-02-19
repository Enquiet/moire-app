<template>
  <a class="catalog__pic" href="#" v-if="colorId === colors.id">
    {{colors.id}}
    <!----<img   v-for="img in product.colors.gallery" :key="img" :src="img"  alt="Название товара">-->
  </a>
</template>
<script>
export default {
  props: {
    colorId: {
      type: Number,
      default: 0
    },
    colors: {
      type: Object,
      default: () => []
    }
  }
}
</script>
