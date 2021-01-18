<template>
     <aside class="filter">

                <form class="filter__form form" action="#" method="get" @submit.prevent="submitBtn">
                    <fieldset class="form__block">
                        <legend class="form__legend">Цена</legend>
                        <label class="form__label form__label--price">
              <input class="form__input" type="text" name="min-price" v-model.number="currentMinPrice">
              <span class="form__value">От</span>
            </label>
                        <label class="form__label form__label--price">
              <input class="form__input" type="text" name="max-price" v-model.number="currentMaxPrice">
              <span class="form__value">До</span>
            </label>
                    </fieldset>

                  <fieldset class="form__block">
                    <legend class="form__legend">Категория</legend>
                    <label class="form__label form__label--select">
                      <select class="form__select" type="text" name="category" v-model.number="currentProductId">
                        <option value="0">Все категории</option>
                        <option :value="category.id" v-for="category in getAllListCategory" :key="category.id">{{category.title}}</option>
                      </select>
                    </label>
                  </fieldset>

                    <fieldset class="form__block">
                        <legend class="form__legend">Цвет</legend>
                        <ul class="colors">
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#73B6EA" checked="">
                  <span class="colors__value" style="background-color: #73B6EA;">
                  </span>
                </label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFBE15">
                  <span class="colors__value" style="background-color: #FFBE15;">
                  </span>
                </label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#939393">
                  <span class="colors__value" style="background-color: #939393;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#8BE000">
                  <span class="colors__value" style="background-color: #8BE000;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FF6B00">
                  <span class="colors__value" style="background-color: #FF6B00;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#FFF">
                  <span class="colors__value" style="background-color: #FFF;">
                </span></label>
                            </li>
                            <li class="colors__item">
                                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" name="color" value="#000">
                  <span class="colors__value" style="background-color: #000;">
                </span></label>
                            </li>
                        </ul>
                    </fieldset>

                  <ProductFilterCheck :current-filter.sync='currentMaterial' :filter-list="getMaterialList" :number-repited-product='getNumberMaterial' :title="materialTitle"/>
                  <ProductFilterCheck :current-filter.sync='currentSeasons' :filter-list="getSeasonsList" :number-repited-product='getNumberSeasons' :title="seasonsTitle"/>

                    <button class="filter__submit button button--primery" type="submit" >
            Применить
          </button>
                    <button class="filter__reset button button--second" type="button" @click.prevent="clearBtn">
            Сбросить
          </button>
                </form>
            </aside>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import ProductFilterCheck from '@/components/ProductFilterCheck'
export default {
  data () {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 0,
      currentProductId: 0,
      currentMaterial: [],
      currentSeasons: [],
      materialTitle: 'Материал',
      seasonsTitle: 'Коллекции'
    }
  },
  props: {
    minPrice: {
      type: Number,
      default: 0
    },
    maxPrice: {
      type: Number,
      default: 0
    },
    categoryId: {
      type: Number,
      default: 0
    },
    materialIds: {
      type: Array,
      default: () => []
    },
    seasonIds: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ProductFilterCheck
  },
  computed: {
    ...mapGetters('categoryModule', ['getAllCategory']),
    ...mapGetters('productModule', ['getNumberMaterial']),
    ...mapGetters('productModule', ['getNumberSeasons']),
    getAllListCategory () {
      return this.$store.state.categoryModule.categoryData ? this.$store.state.categoryModule.categoryData.items : []
    },
    getMaterialList (store) {
      return this.$store.state.productMaterial.materialDate ? this.$store.state.productMaterial.materialDate.items : []
    },
    getSeasonsList () {
      return this.$store.state.productSeason.seasonDate ? this.$store.state.productSeason.seasonDate.items : []
    }
  },
  watch: {
    minPrice (value) {
      this.currentMinPrice = value
    },
    maxPrice (value) {
      this.currentMaxPrice = value
    },
    categoryId (value) {
      this.currentProductId = value
    },
    materialIds (value) {
      this.currentMaterial = value
    },
    seasonIds (value) {
      this.currentSeasons = value
    }
  },
  methods: {
    ...mapActions('categoryModule', ['getListCategies']),
    ...mapActions('productMaterial', ['getListMaterial']),
    ...mapActions('productModule', ['getAllProducts']),
    ...mapActions('productSeason', ['getListSeasons']),
    submitBtn () {
      this.$emit('update:categoryId', this.currentProductId)
      this.$emit('update:maxPrice', this.currentMaxPrice)
      this.$emit('update:minPrice', this.currentMinPrice)
      this.$emit('update:materialIds', this.currentMaterial)
      this.$emit('update:seasonIds', this.currentSeasons)
    },
    clearBtn () {
      this.$emit('update:categoryId', 0)
      this.$emit('update:maxPrice', 0)
      this.$emit('update:minPrice', 0)
      this.$emit('update:materialIds', [])
      this.$emit('update:seasonIds', [])
    }
  },
  async mounted () {
    this.getListCategies()
    this.getListMaterial()
    this.getAllProducts()
    this.getListSeasons()
  }
}
</script>
