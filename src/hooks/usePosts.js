import { postService } from '@/services'
import { onMounted, ref } from 'vue'

export async function usePosts(limit) {
  const posts = ref([])
  const totalPages = ref(0)
  const isPostsFetching = ref(true)

  const fetchPosts = async () => {
    isPostsFetching.value = true

    try {
      const response = await postService.getList({
        page: 1,
        limit: limit
      })

      totalPages.value = Math.ceil(response.headers['x-total-count'] / this.limit)
      posts.value = response.data
    } catch (e) {
      console.log(e)
    } finally {
      isPostsFetching.value = false
    }
  }

  onMounted(fetchPosts)

  return {
    posts,
    isPostsFetching,
    totalPages
  }
}
