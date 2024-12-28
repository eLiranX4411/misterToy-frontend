import { reviewService } from '../../services/review.service.js'

export const SET_REVIEWS = 'SET_REVIEWS'
export const ADD_REVIEW = 'ADD_REVIEW'
export const REMOVE_REVIEW = 'REMOVE_REVIEW'
export const UPDATE_REVIEW = 'UPDATE_REVIEW'
export const SET_FILTER_BY = 'SET_FILTER_BY'

const initialState = {
  reviews: [],
  filterBy: reviewService.getDefaultFilter()
}

export function reviewReducer(state = initialState, cmd = {}) {
  switch (cmd.type) {
    case SET_REVIEWS:
      return { ...state, reviews: cmd.reviews }
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, cmd.review] }
    case REMOVE_REVIEW:
      return { ...state, reviews: state.reviews.filter((review) => review._id !== cmd.reviewId) }
    case UPDATE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((review) =>
          review._id === cmd.review._id ? cmd.review : review
        )
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
