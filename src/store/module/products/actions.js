import { API_URL } from '@/helpers/API.js'

export function getLoadProducts (context, {
  categoryId,
  minPrice,
  maxPrice,
  limit,
  page,
  materials,
  seasons
}) {
  console.log(materials, seasons)
  return fetch(API_URL + '/api/products?categoryId=' + categoryId + '&materialIds[]=' + materials + '&seasonIds[]=' + seasons + '&page=' + page + '&limit=' + limit + '&minPrice=' + minPrice + '&maxPrice=' + maxPrice, {
    method: 'GET'
  }).then(response => {
    return response.json()
  })
    .then((response) => {
      context.commit('updateProductDate', response)
    })
}
export function getAllProducts (context) {
  return fetch(API_URL + '/api/products', {
    method: 'GET'
  })
    .then(date => {
      return date.json()
    })
    .then((date) => {
      context.commit('updateAllProductDate', date)
    })
}
