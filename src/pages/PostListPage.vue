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
      <custom-select data-grid-area="select" v-model="sortBy" :options="sortOptions" />
    </div>
  </header>

  <main class="content">
    <post-list v-if="!isPostsFetching" :posts="sortedAndSearchedPosts" @remove="removePost" />
    <div v-else>Загружаем посты...</div>
  </main>

  <div ref="observer" class="observer" v-intersection="fetchNextPosts"></div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import { PostService } from '@/services'

export default {
  components: {
    PostList,
    PostForm
  },
  data() {
    return {
      totalPages: 0,
      page: 1,
      limit: 10,
      posts: [],
      dialogVisible: false,
      isPostsFetching: false,
      searchQuery: '',
      sortBy: '',
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По содержимому' },
        { value: 'id-asc', name: 'Сначала старые' },
        { value: 'id-desc', name: 'Сначала новые' }
      ]
    }
  },
  methods: {
    showDialog() {
      this.dialogVisible = true
    },
    closeDialog() {
      this.dialogVisible = false
    },
    createPost(post) {
      this.posts.push(post)
      this.closeDialog()
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id)
    },
    async fetchPosts() {
      this.isPostsFetching = true

      const response = await PostService.getList({
        page: this.page,
        limit: this.limit
      })

      this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)

      this.isPostsFetching = false

      this.posts = response.data
    },
    async fetchNextPosts() {
      this.page += 1

      const response = await PostService.getList({
        page: this.page,
        limit: this.limit
      })

      this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)

      this.posts = [...this.posts, ...response.data]
    }
  },
  computed: {
    sortedPosts() {
      const postsCopy = [...this.posts]

      if (this.sortBy === 'id-asc') {
        return postsCopy.sort((postA, postB) => postA.id - postB.id)
      }

      if (this.sortBy === 'id-desc') {
        return postsCopy.sort((postA, postB) => postB.id - postA.id)
      }

      return postsCopy.sort((postA, postB) => {
        return postA[this.sortBy]?.localeCompare(postB[this.sortBy])
      })
    },
    sortedAndSearchedPosts() {
      const searchQuery = this.searchQuery.toLowerCase()

      return this.sortedPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchQuery)
      })
    }
  },
  mounted() {
    this.fetchPosts()
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
