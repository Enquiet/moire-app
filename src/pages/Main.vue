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
      :page.sync="productFilter.page"
      :total-products="pagination"
      :per-products="productFilter.limit"
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
        maxPrice: 0,
        page: 1,
        limit: 6
      }
    }
  },
  components: {
    ProductsList, Pagination, ProductsFilter
  },
  methods: {
    ...mapActions('products', ['getLoadProducts'])
  },
  computed: {
    ...mapState('products', ['pagination', 'productsData'])
  },
  watch: {
    optionPage: {
      handler () {
        this.getLoadProducts(this.productFilter)
      },
      deep: true
    },
    productFilter: {
      handler () {
        this.getLoadProducts(this.productFilter)
      },
      immediate: true,
      deep: true
    }
  }

}
</script>
