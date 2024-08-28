<template>
  <custom-dialog v-model:show="dialogVisible">
    <post-form @create="createPost" />
  </custom-dialog>

  <header class="header">
    <h1 class="header__title">Страница с постами</h1>

    <div class="header__controls">
      <custom-input
        data-grid-area="search"
        v-model="searchQuery"
        placeholder="Название поста"
        v-focus
      />
      <custom-button data-grid-area="create" @click="showDialog">Создать пост</custom-button>
      <custom-select data-grid-area="select" v-model="selectedSorting" :options="sortOptions" />
    </div>
  </header>

  <main class="content">
    <post-list v-if="!isPostsFetching" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Загружаем посты...</div>
  </main>

  <div ref="observer" class="observer" v-intersection="fetchNextPosts"></div>
</template>

<script>
import { usePosts } from '@/hooks/usePosts'
import useSearchedPosts from '@/hooks/useSearchedPosts'
import useSortedPosts from '@/hooks/useSortedPosts'

export default {
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id-asc', name: 'Сначала старые' },
        { value: 'id-desc', name: 'Сначала новые' }
      ]
    }
  },
  setup() {
    const { posts, totalPages, isPostsFetching } = usePosts(10)
    const { sortedPosts, selectedSorting } = useSortedPosts(posts)
    const { searchedPosts, searchQuery } = useSearchedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isPostsFetching,
      sortedPosts,
      selectedSorting,
      searchedPosts,
      searchQuery
    }
  }
}
</script>

<style scoped>
.header {
  margin-bottom: 25px;
}
.header__title {
  margin-bottom: 15px;
}
.header__controls {
  display: grid;
  grid-template-areas:
    'search search'
    'create select';
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 15px;
}
.header__controls > [data-grid-area='search'] {
  grid-area: search;
}
.header__controls > [data-grid-area='create'] {
  grid-area: create;
}
.header__controls > [data-grid-area='select'] {
  grid-area: select;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  margin-top: 15px;
}
.pagination__number {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  min-width: 40px;
  height: 40px;
  border: 2px solid rgb(200, 200, 200);
  border-radius: 5px;
  cursor: pointer;
}

.pagination__number_active {
  border-color: teal;
}

.observer {
  height: 0px;
  width: 0px;
  visibility: hidden;
}
</style>
