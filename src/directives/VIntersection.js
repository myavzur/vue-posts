export default {
  name: 'intersection',
  mounted(el, binding) {
    const options = {
      rootMargin: '0px',
      threshold: 0.5
    }

    const callback = (entries) => {
      const isIntersecting = entries[0].isIntersecting
      // const isLastPage = this.page === this.totalPages
      if (!isIntersecting) return

      binding.value()
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  }
}
