<template>
  <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">152 товара</span>
    </div>

    <div class="content__catalog">
      <ProductsFilter
      v-bind.sync="productFilter"
      />
      <ProductsList
      v-if="productsData.length"
      :productList="productsData"
      />
    </div>
      <Pagination
      :page.sync="page"
      :total-products="pagination"
      :per-products="limitProductPage"
      />
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue'
import Pagination from '@/components/Pagination.vue'
import ProductsFilter from '@/components/ProductsFilter.vue'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'App',
  data () {
    return {
      productFilter: {
        categoryId: 0,
        materialIds: [],
        seasonIds: [],
        colorIds: 0,
        minPrice: 0,
        maxPrice: 0

      },
      page: 1,
      limitProductPage: 6
    }
  },
  components: {
    ProductsList, Pagination, ProductsFilter
  },
  methods: {
    ...mapActions('products', ['getLoadProducts'])
  },
  async mounted () {
    this.getLoadProducts(this.filters)
  },
  computed: {
    ...mapState('products', ['pagination', 'productsData']),
    filters () {
      return {
        categoryId: this.productFilter.categoryId,
        minPrice: this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice,
        limit: this.limitProductPage,
        page: this.page,
        materials: this.productFilter.materialIds,
        seasons: this.productFilter.seasonIds,
        color: this.productFilter.colorIds
      }
    }
  },
  watch: {
    page () {
      this.getLoadProducts(this.filters)
    },
    productFilter: {
      handler () {
        this.getLoadProducts(this.filters)
      },
      deep: true
    }
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
