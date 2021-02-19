<template>
  <fieldset class="form__block">
    <legend class="form__legend">{{title}}</legend>
    <ul class="check-list">
      <li class="check-list__item" v-for="filter in filterList" :key="filter.id">
        <label class="check-list__label">
        <input class="check-list__check sr-only" type="checkbox" name="volume" v-model="materialCheck" :value="filter.id"  checked="">
          <span class="check-list__desc">
            {{filter.title}}
            <span>({{filter.productsCount}})</span>
          </span>
        </label>
      </li>
    </ul>
  </fieldset>
</template>

<script>
export default {
  props: {
    currentFilter: {
      type: Array,
      default: () => []
    },
    filterList: {
      type: Array,
      default: () => []
    },

    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    materialCheck: {
      get () {
        return this.currentFilter
      },
      set (value) {
        this.$emit('update:currentFilter', value)
      }
    }
  }
}
</script>
