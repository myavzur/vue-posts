import axios from 'axios'

class PostService {
  API_URL = 'https://jsonplaceholder.typicode.com/posts'

  async getList({ page, limit }) {
    return await axios.get(`${this.API_URL}`, {
      params: {
        _page: page,
        _limit: limit
      }
    })
  }
}

export default new PostService()
