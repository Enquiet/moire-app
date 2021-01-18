export function getNumberMaterial (state) {
  const MATERIALS = ['Хлопок', 'Шерсть', 'Полиэстер', 'Полиамид']
  const result = {}
  MATERIALS.forEach((item) => {
    result[item] = 0
  })
  const quantityFilter = state.allproductDate.items.reduce((accmulator, item) => {
    return item.materials ? [...accmulator, ...item.materials] : accmulator
  }, [])
  for (let i = 0; i < quantityFilter.length; i++) {
    if (result[quantityFilter[i].title] !== undefined) {
      result[quantityFilter[i].title] += 1
    }
  }
  console.log(result)
  return result
}

export function getNumberSeasons (state) {
  const SEASONS = ['Зима', 'Осень', 'Лето', 'Весна']
  const result = {}
  SEASONS.forEach((item) => {
    result[item] = 0
  })
  const quantityFilter = state.allproductDate.items.reduce((accmulator, item) => {
    return item.seasons ? [...accmulator, ...item.seasons] : accmulator
  }, [])
  for (let i = 0; i < quantityFilter.length; i++) {
    if (result[quantityFilter[i].title] !== undefined) {
      result[quantityFilter[i].title] += 1
    }
  }
  console.log(result)
  return result
}
