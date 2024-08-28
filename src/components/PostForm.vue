<template>
  <form class="form" @submit.prevent="createPost">
    <h4>Создание поста</h4>

    <custom-input v-model.trim="post.title" placeholder="Название" v-focus />
    <custom-input v-model.trim="post.body" placeholder="Описание" />

    <custom-button class="form__button">Создать</custom-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      const isFilled = this.post.title.trim() && this.post.body.trim()
      if (!isFilled) return

      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style lang="css" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form__checkbox {
  user-select: none;
  align-self: flex-end;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.form__button {
  align-self: flex-end;
}
</style>
