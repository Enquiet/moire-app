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
      v-if="this.$store.state.productModule.productDate.items"
      :productList="this.$store.state.productModule.productDate.items"
      />
    </div>
      <Pagination
      :page.sync="page"
      :all-products="getAllProducts"
      :per-products="limitProductPage"
      />
  </main>
</template>

<script>
import ProductsList from '@/components/ProductsList.vue'
import Pagination from '@/components/Pagination.vue'
import ProductsFilter from '@/components/ProductsFilter.vue'
import { mapActions } from 'vuex'

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
    ...mapActions('productModule', ['getLoadProducts'])
  },
  async mounted () {
    this.getLoadProducts({
      categoryId: this.productFilter.categoryId,
      minPrice: this.productFilter.minPrice,
      maxPrice: this.productFilter.maxPrice,
      limit: this.limitProductPage,
      page: this.page,
      materials: this.productFilter.materialIds,
      seasons: this.productFilter.seasonIds,
      color: this.productFilter.colorIds
    })
  },
  computed: {
    getAllProducts () {
      return this.$store.state.productModule.productDate.pagination ? this.$store.state.productModule.productDate.pagination.total : 0
    }
  },
  watch: {
    page () {
      this.getLoadProducts({
        categoryId: this.productFilter.categoryId,
        minPrice: this.productFilter.minPrice,
        maxPrice: this.productFilter.maxPrice,
        limit: this.limitProductPage,
        page: this.page,
        materials: this.productFilter.materialIds,
        seasons: this.productFilter.seasonIds
      })
    },
    productFilter: {
      handler () {
        this.getLoadProducts({
          categoryId: this.productFilter.categoryId,
          minPrice: this.productFilter.minPrice,
          maxPrice: this.productFilter.maxPrice,
          limit: this.limitProductPage,
          page: this.page,
          materials: this.productFilter.materialIds,
          seasons: this.productFilter.seasonIds
        })
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
