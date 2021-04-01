<template>
  <div class="cart__wrapper">
    <h3 class="cart__title">{{titleWais}}</h3>
    <ul class="cart__options options">
      <li class="options__item" v-for="ways in itemWays" :key="ways.id">
        <label class="options__label">
          <input class="options__radio sr-only" type="radio" :value="ways.id" v-model="checkWays" checked="">
          <span class="options__value">
            {{ways.title}} <b>{{ways.price}}</b>
          </span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    itemWays: {
      type: Array,
      default: () => []
    },
    waysId: {
      type: Number,
      default: 1
    },
    titleWais: {
      type: String,
      default: ''
    }
  },
  computed: {
    checkWays: {
      get () {
        return this.waysId
      },
      set (val) {
        this.$emit('update:waysId', val)
      }
    }
  }
}
</script>
<style lang="scss">
  .cart__wrapper{
    &:last-child{
      margin-top: 20px;
    }
  }
</style>
