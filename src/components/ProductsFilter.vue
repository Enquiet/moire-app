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
          <option
          :value="category.id" v-for="category in categoiesData"
          :key="category.id">
          {{category.title}}
          </option>
        </select>
      </label>
    </fieldset>

    <fieldset class="form__block">
      <legend class="form__legend">Цвет</legend>
      <ProductFilterColors
      :current-color.sync="currentColors"
      :colors="colorsData"
      />
    </fieldset>
    <ProductFilterCheck
    :current-filter.sync='currentMaterial'
    :filter-list="materialsData"
    :title="materialTitle"
    />
    <ProductFilterCheck
    :current-filter.sync='currentSeasons'
    :filter-list="seasonsData"
    :title="seasonsTitle"
    />
    <button class="filter__submit button button--primery" type="submit" >Применить</button>
    <button class="filter__reset button button--second" type="button" @click.prevent="clearBtn">Сбросить</button>
  </form>
</aside>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ProductFilterCheck from '@/components/ProductFilterCheck'
import ProductFilterColors from '@/components/ProductFilterColors.vue'
export default {
  data () {
    return {
      currentMinPrice: 0,
      currentMaxPrice: 0,
      currentProductId: 0,
      currentMaterial: [],
      currentSeasons: [],
      currentColors: [],
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
    },
    colorIds: {
      type: Array,
      default: () => []
    }
  },
  components: {
    ProductFilterCheck, ProductFilterColors
  },
  computed: {
    ...mapState('filters', ['categoiesData', 'materialsData', 'seasonsData', 'colorsData'])
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
    },
    colorIds (value) {
      this.currentColors = value
    }
  },
  methods: {
    ...mapActions('filters', ['getCategies', 'getMaterial', 'getSeasons', 'getColor']),
    submitBtn () {
      this.$emit('update:categoryId', this.currentProductId)
      this.$emit('update:maxPrice', this.currentMaxPrice)
      this.$emit('update:minPrice', this.currentMinPrice)
      this.$emit('update:materialIds', this.currentMaterial)
      this.$emit('update:seasonIds', this.currentSeasons)
      this.$emit('update:colorIds', this.currentColors)
    },
    clearBtn () {
      this.$emit('update:categoryId', 0)
      this.$emit('update:maxPrice', 0)
      this.$emit('update:minPrice', 0)
      this.$emit('update:materialIds', [])
      this.$emit('update:seasonIds', [])
      this.$emit('update:colorIds', [])
    }
  },
  async mounted () {
    this.getCategies()
    this.getMaterial()
    this.getSeasons()
    this.getColor()
  }
}
</script>
