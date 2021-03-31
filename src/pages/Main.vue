<template>
   <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">Каталог</h1>
      <span class="content__info">{{pagination}} товара</span>
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
  data () {
    return {
      productFilter: {
        categoryId: 0,
        materialIds: [],
        seasonIds: [],
        colorIds: [],
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
  computed: {
    ...mapState('products', ['pagination', 'productsData']),
    filters () {
      return {
        categoryId: `categoryId=${this.productFilter.categoryId}`,
        minPrice: `minPrice=${this.productFilter.minPrice}`,
        maxPrice: `maxPrice=${this.productFilter.maxPrice}`,
        limit: `limit=${this.limitProductPage}`,
        page: `page=${this.page}`,
        materials: `materialIds[]=${this.productFilter.materialIds}`,
        seasons: `seasonIds[]=${this.productFilter.seasonIds}`,
        color: `colorIds[]=${this.productFilter.colorIds}`
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
      immediate: true,
      deep: true
    }
  }

}
</script>
