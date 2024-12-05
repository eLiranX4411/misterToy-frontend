import { toyService } from '../../services/toy.service.js'
import { store } from '../store.js'
import {
  SET_TOYS,
  REMOVE_TOY,
  ADD_TOY,
  UPDATE_TOY,
  SET_IS_LOADING,
  SET_FILTER_BY
} from '../reducers/toy.reducer.js'
export function loadToys(filterBy = {}) {
  store.dispatch({ type: SET_IS_LOADING, isLoading: true })
  return toyService
    .query(filterBy || {})
    .then((toys) => {
      store.dispatch({ type: SET_TOYS, toys })
    })
    .catch((err) => {
      console.error('Toy action -> Cannot load toys', err)
      throw err
    })
    .finally(() => {
      store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    })
}

export function removeToy(toyId) {
  return toyService
    .remove(toyId)
    .then(() => {
      store.dispatch({ type: REMOVE_TOY, toyId })
    })
    .catch((err) => {
      console.log('Toy action -> Cannot remove toy')
      throw err
    })
}

export function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY
  return toyService
    .save(toy)
    .then((toy) => {
      store.dispatch({ type, toy })
    })
    .catch((err) => {
      console.log('Toy action -> Cannot add toy')
      throw err
    })
}

export function setFilter(filterBy) {
  const cmd = {
    type: SET_FILTER_BY,
    filterBy
  }
  store.dispatch(cmd)
}
