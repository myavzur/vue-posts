<template>
  <select class="select" :value="modelValue" @change="changeOption">
    <option disabled value="">Выберите фильтр</option>

    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 'custom-select',
  props: {
    modelValue: {
      type: String
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
.select {
  font-family: inherit;
  padding: 10px 15px;
  background: cadetblue;
  border: none;
  border-radius: 5px;
  color: white;
  outline: none;
  cursor: pointer;
}
</style>
