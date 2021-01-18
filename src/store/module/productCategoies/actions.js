import { API_URL } from '@/helpers/API.js'

export function getListCategies (context) {
  fetch(API_URL + '/api/productCategories', {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      context.commit('updateProductCategoies', response)
    })
}
