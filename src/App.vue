<template>
  <app-navigation />

  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavigation from '@/components/AppNavigation.vue'

export default {
  components: {
    AppNavigation
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: sans-serif;
}

.app {
  padding: 20px;
}
</style>
