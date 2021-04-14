<template>
  <FormField :title="titleInput">
    <textarea class="form__input form__input--area" type="type" name="comments" v-model="inputValue" :placeholder="placeholder"></textarea>
  </FormField>
</template>
<script>
import FormField from '@/components/FormField.vue'
export default {
  components: { FormField },
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    titleInput: {
      type: String,
      default: ''
    },
    type: {
      default: 'text'
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>
