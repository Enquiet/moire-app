<template>
   <li class="catalog__item">
        <ProductImg
        v-for="color in product.colors"
        :key="color.id"
        :color-id="colorImg"
        :colors="color"
        />
        <h3 class="catalog__title">
          <a href="#">
            {{product.title}}
          </a>
        </h3>
        <span class="catalog__price">
          {{product.price}} ₽
        </span>
        <ProductColor
        :color-img.sync="colorImg"
        :colors="product.colors"
        />
      </li>
</template>
<script>
import { mapGetters } from 'vuex'
import ProductColor from './ProductColor.vue'
import ProductImg from './ProductImg.vue'
export default {
  data () {
    return {
      colorImg: 0
    }
  },
  props: {
    product: {
      type: Object,
      default: () => []
    }
  },
  components: {
    ProductColor, ProductImg
  },
  computed: {
    ...mapGetters('productModule', ['getImgProducts'])
  }
}
</script>
