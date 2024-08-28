<template>
  <div>
    <div class="navbar">
      <div class="navbar__logo" @click="$router.push('/')">Vue 3</div>
      <div class="navbar__links">
        <custom-button @click="$router.push('/')" kind="secondary">Главная</custom-button>
        <custom-button @click="$router.push('/posts')" kind="secondary">Посты</custom-button>
        <custom-button @click="$router.push('/composition-api')" kind="secondary"
          >Composition API</custom-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  padding: 0px 25px;
  color: white;
  height: 75px;
  background-color: cadetblue;
  display: flex;
  align-items: center;
}
.navbar__logo {
  font-size: 24px;
  cursor: pointer;
}
.navbar__links {
  display: flex;
  gap: 15px;
  margin-left: auto;
}
</style>
