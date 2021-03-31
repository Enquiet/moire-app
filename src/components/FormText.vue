<template>
  <FormField :title="titleInput">
    <input class="form__input" type="type" name="name" v-model="inputValue" :placeholder="placeholder">
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
