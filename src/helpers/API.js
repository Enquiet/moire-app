import { API_URL } from './url.js'

export default {
  async fetchApi (url, method, data) {
    const response = await fetch(`${API_URL}/${url}`, {
      method
    })
    const json = await response.json()
    return json
  }
}
