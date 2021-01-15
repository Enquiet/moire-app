<template>
  <fieldset class="form__block">
    <legend class="form__legend">Категория</legend>
    <label class="form__label form__label--select">
      <select class="form__select" type="text" name="category" v-model.number="productId">
        <option value="0">Все категории</option>
        <option :value="category.id" v-for="category in categoryData" :key="category.id">{{category.title}}</option>

      </select>
    </label>
  </fieldset>
</template>

<script>
import { API_URL } from '@/helpers/API.js'
export default {
  data () {
    return {
      categoryData: 0
    }
  },
  props: {
    productId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    productId (value) {
      return this.$emit('update:productId', value)
    }
  },
  methods: {
    getCategotyProductId () {
      fetch(API_URL + '/api/productCategories', {
        method: 'GET'
      })
        .then(response => {
          return response.json()
        })
        .then(response => {
          this.categoryData = response.items
          response.items.pop()
        })
    }
  },
  created () {
    this.getCategotyProductId()
  }
}
</script>
