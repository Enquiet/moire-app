<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="checkbox" :value="color.id" v-model="colorPick" checked="">
        <span class="colors__value" :style="{background: color.code}"></span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    currentColor: {
      type: Array,
      default: () => []
    },
    colors: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    colorPick: {
      get () {
        return this.currentColor
      },
      set (val) {
        return this.$emit('update:currentColor', val)
      }
    }
  }
}
</script>
