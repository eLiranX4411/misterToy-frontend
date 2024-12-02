import { toyService } from '../../services/toy.service.js'

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const toyInitialState = {
  toys: [],
  isLoading: false,
  filterBy: toyService.getDefaultFilter()
}

export function toyReducer(state = toyInitialState, cmd = {}) {
  switch (cmd.type) {
    case SET_TOYS:
      return { ...state, toys: cmd.toys }
    case REMOVE_TOY:
      return { ...state, toys: state.toys.filter((toy) => toy._id !== cmd.toyId) }
    case ADD_TOY:
      return { ...state, toys: [...state.toys, cmd.toy] }
    case UPDATE_TOY:
      return {
        ...state,
        toys: state.toys.map((toy) => {
          return toy._id === cmd.toy._id ? cmd.toy : toy
        })
      }
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: cmd.isLoading
      }
    case SET_FILTER_BY:
      return {
        ...state,
        filterBy: cmd.filterBy
      }

    default:
      return state
  }
}
