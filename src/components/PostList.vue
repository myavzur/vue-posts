<template>
  <div v-if="posts.length > 0">
    <h3 class="title">Список постов</h3>

    <transition-group class="post-list" tag="div" name="post-list">
      <post-item
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
  </div>

  <h2 v-else class="error">Список постов пуст</h2>
</template>

<script>
import PostItem from '@/components/PostItem.vue'

export default {
  components: { PostItem },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.title {
  margin-bottom: 15px;
}

.post-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.3s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(35px);
}

.post-list-move {
  transition: transform 0.3s ease;
}

.error {
  color: red;
}
</style>
