<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар"
      @click.prevent="(amount--)"
      :disabled="amountProduct === 1"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>
    <input type="text" v-model.number="amount" name="count">
    <button type="button" aria-label="Добавить один товар"
      @click.prevent="(amount++)"
    >
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    amountProduct: {
      type: Number,
      default: 1
    }
  },
  computed: {
    amount: {
      get () {
        return this.amountProduct
      },
      set (val) {
        return this.$emit('update:amountProduct', val)
      }
    }
  }
}
</script>
