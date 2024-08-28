<template>
  <input class="input" :value="modelValue" @input="updateInput" type="text" />
</template>

<script>
export default {
  name: 'custom-input',
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border: 1px solid cadetblue;
  border-radius: 5px;
  padding: 10px 15px;
}
.input:focus {
  outline-color: teal;
}
</style>
