<template>
  <div class="post" :key="post.id">
    <div class="post__info">
      <div><strong>Название:</strong> {{ post.title }}</div>
      <div><strong>Описание:</strong> {{ post.body }}</div>
      <div><strong>ID:</strong> {{ post.id }}</div>
    </div>

    <div class="post__buttons">
      <custom-button @click="$router.push(`/posts/${post.id}`)">Открыть</custom-button>
      <custom-button @click="$emit('remove', post)">Удалить</custom-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  padding: 15px;
  border-radius: 15px;
  border: 2px solid teal;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.post__info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.post__buttons {
  margin-top: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
}
</style>
