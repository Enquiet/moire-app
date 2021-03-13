import { API_URL } from './url.js'

export default {
  async fetchApi (url, method = 'GET', data) {
    const response = await fetch(`${API_URL}/${url}`, {
      method
    })
    if (!response.ok) {
      const error = new Error(response.error)
      throw error
    }
    const json = await response.json()
    return json
  }
}
