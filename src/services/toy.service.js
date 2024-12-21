import { httpService } from './http.service.js'

const BASE_URL = 'toy/'
const labels = [
  'On wheels',
  'Box game',
  'Art',
  'Baby',
  'Doll',
  'Puzzle',
  'Outdoor',
  'Battery Powered'
]

export const toyService = {
  query,
  getById,
  save,
  remove,
  getEmptyToy,
  getDefaultFilter,
  getToyLabels,
  addToyMsg,
  removeToyMsg
}

function query(filterBy = {}) {
  return httpService.get(BASE_URL, filterBy) // Explicitly use params
}

function getById(toyId) {
  return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
  return httpService.delete(BASE_URL + toyId)
}

async function save(toy) {
  if (toy._id) {
    // Update existing toy
    return await httpService.put(`toy/${toy._id}`, toy)
  } else {
    // Add new toy
    return await httpService.post(`toy`, toy)
  }
}

// function save(toy) {
//   const method = toy._id ? 'put' : 'post'
//   return httpService[method](BASE_URL, toy)
// }

function addToyMsg(toyId, msg) {
  return httpService.post(`${BASE_URL}${toyId}/msg`, msg)
}

function removeToyMsg(toyId, msgId) {
  return httpService.delete(`${BASE_URL}${toyId}/msg/${msgId}`)
}

function getDefaultFilter() {
  return {
    name: '',
    inStock: 'all',
    labels: [],
    pageIdx: 0,
    sortBy: {
      type: 'name',
      desc: 1
    }
  }
}

function getEmptyToy() {
  return {
    name: '',
    price: '',
    labels: _getRandomLabels()
  }
}

function getToyLabels() {
  return [...labels]
}

function _getRandomLabels() {
  const labelsCopy = [...labels]
  const randomLabels = []
  for (let i = 0; i < 2; i++) {
    const randomIdx = Math.floor(Math.random() * labelsCopy.length)
    randomLabels.push(labelsCopy.splice(randomIdx, 1)[0])
  }
  return randomLabels
}
