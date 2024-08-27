import MainPage from '@/pages/MainPage.vue'
import PostListPage from '@/pages/PostListPage.vue'
import PostPage from '@/pages/PostPage.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: MainPage
  },
  {
    path: '/posts',
    component: PostListPage
  },
  {
    path: '/posts/:id',
    component: PostPage
  }
]

export default createRouter({
  routes,
  history: createWebHistory()
})
