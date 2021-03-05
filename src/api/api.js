/* eslint no-useless-catch:0 */
import { API_URL } from './url.js'

export default {
  async fetchApi (url, method, data) {
    try {
      const response = await fetch(`${API_URL}/${url}`, {
        method
      })
      const json = await response.json()
      return json
    } catch (e) {
      throw e
    }
  }
}
