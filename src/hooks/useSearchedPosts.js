import { computed, ref } from 'vue'

export default function useSearchedPosts(posts) {
  const searchQuery = ref('')

  const searchedPosts = computed(() => {
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    })
  })

  return { searchQuery, searchedPosts }
}
