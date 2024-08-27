import axios from 'axios'

class PostService {
  API_URL = 'https://jsonplaceholder.typicode.com/posts'

  async getList({ page, limit }) {
    try {
      return await axios.get(`${this.API_URL}`, {
        params: {
          _page: page,
          _limit: limit
        }
      })
    } catch (e) {
      console.log(e)
    }
  }
}

export default new PostService()
