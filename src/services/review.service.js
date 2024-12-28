import { httpService } from './http.service.js'

export const reviewService = {
  query,
  remove,
  add,
  getDefaultFilter
}

function query(filterBy) {
  var queryStr = !filterBy ? '' : `?name=${filterBy.name}&sort=anaAref`
  return httpService.get(`review${queryStr}`)
}

async function remove(reviewId) {
  await httpService.delete(`review/${reviewId}`)
}

async function add({ txt, aboutToyId, byUserId }) {
  return await httpService.post(`review`, { txt, aboutToyId, byUserId })
}

function getDefaultFilter() {
  return {
    name: '',
    sortBy: {
      type: 'name',
      desc: 1
    }
  }
}
