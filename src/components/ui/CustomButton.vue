<template>
  <button
    class="btn"
    :class="{
      [`btn_${kind}`]: Boolean(kind)
    }"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'custom-button',
  props: {
    kind: {
      type: String,
      default: 'primary'
    }
  }
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
  border-radius: 5px;
  cursor: pointer;
}
.btn_secondary {
  color: white;
  border-color: white;
}
</style>
