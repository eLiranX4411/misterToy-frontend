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

export async function loadToys(filterBy) {
  try {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const toys = await toyService.query(filterBy)
    console.log(`toyReducer:`, toys)
    store.dispatch({ type: SET_TOYS, toys })
    return toys
  } catch (err) {
    console.error('Toy action -> Cannot load toys', err)
    throw new Error(`Cannot load toys, try again later`)
  } finally {
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
  }
}

export async function removeToy(toyId) {
  try {
    const toyToRemove = await toyService.remove(toyId)
    store.dispatch({ type: REMOVE_TOY, toyId })
    return toyToRemove
  } catch (err) {
    console.log('Toy action -> Cannot remove toy', err)
    throw new Error(`Cannot Remove toy, try again later`)
  }
}

export async function saveToy(toy) {
  const type = toy._id ? UPDATE_TOY : ADD_TOY

  try {
    const toyToSave = await toyService.save(toy)
    store.dispatch({ type, toy })
    return toyToSave
  } catch (err) {
    console.log('Toy action -> Cannot add toy', err)
    throw new Error(`Cannot Save toy, try again later`)
  }
}

export function setFilter(filterBy) {
  const cmd = {
    type: SET_FILTER_BY,
    filterBy
  }
  store.dispatch(cmd)
}
