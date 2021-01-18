import { API_URL } from '@/helpers/API.js'
export function getListMaterial (context) {
  return fetch(API_URL + '/api/materials', {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .then(data => {
      context.commit('updateMaterail', data)
    })
}
