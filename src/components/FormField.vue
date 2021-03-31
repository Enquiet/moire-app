<template>
  <label class="form__label">
    <slot/>
    <span class="form__value">{{title}}</span>
     <span class="form__error">Неверный формат телефона</span>
  </label>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
