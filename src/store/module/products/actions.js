import { API_URL } from '@/helpers/API.js'

export function getLoadProducts (context, {
  categoryId,
  minPrice,
  maxPrice,
  limit,
  page
}) {
  fetch(API_URL + '/api/products?', new URLSearchParams({
    categoryId: categoryId,
    minPrice: minPrice,
    maxPrice: maxPrice,
    limit: limit,
    page: page
  }), {
    method: 'GET'
  }).then(response => {
    return response.json()
  })
    .then((response) => {
      context.commit('updateProductDate', response)
    })
}
