<template>
  <ul class="colors colors--black">
    <li class="colors__item" v-for="color in colors" :key="color.id">
      <label class="colors__label">
        <input class="colors__radio sr-only" type="radio" :value="color.id" v-model="colorPick" checked="">
        <span class="colors__value" :style="{background: color.color.code}">
        </span>
      </label>
    </li>
  </ul>
</template>

<script>
export default {
  data () {
    return {
      colorOn: this.colors[0].id
    }
  },
  props: {
    colorImg: {
      type: Number,
      default: 0
    },
    colors: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    colorOn (value) {
      this.colorImg = value
    }
  },
  computed: {
    colorPick: {
      get () {
        return this.colorImg
      },
      set (val) {
        return this.$emit('update:colorImg', val)
      }
    }
  },
  created () {
    this.$emit('update:colorImg', this.colorOn)
  }
}
</script>
