import { computed, ref } from 'vue'

export default function useSortedPosts(posts) {
  const selectedSorting = ref('')

  const sortedPosts = computed(() => {
    const postsCopy = [...posts]

    if (selectedSorting.value === 'id-asc') {
      return postsCopy.sort((postA, postB) => postA.id - postB.id)
    }

    if (selectedSorting.value === 'id-desc') {
      return postsCopy.sort((postA, postB) => postB.id - postA.id)
    }

    return postsCopy.sort((postA, postB) => {
      return postA[selectedSorting]?.localeCompare(postB[selectedSorting])
    })
  })

  return { selectedSorting, sortedPosts }
}
