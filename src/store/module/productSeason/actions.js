import { API_URL } from '@/helpers/API.js'

export function getListSeasons (context) {
  return fetch(API_URL + '/api/seasons', {
    method: 'GET'
  })
    .then(response => {
      return response.json()
    })
    .then(response => {
      context.commit('updateSeasonProducts', response)
    })
}
