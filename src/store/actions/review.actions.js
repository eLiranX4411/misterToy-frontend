import { reviewService } from '../../services/review.service.js'

import { store } from '../store.js'
import {
  ADD_REVIEW,
  REMOVE_REVIEW,
  SET_FILTER_BY,
  SET_REVIEWS
} from '../reducers/review.reducer.js'
import { SET_SCORE } from '../reducers/user.reducer.js'

export async function loadReviews(filterBy) {
  try {
    const reviews = await reviewService.query(filterBy)
    store.dispatch({ type: SET_REVIEWS, reviews })
  } catch (err) {
    console.log('ReviewActions: err in loadReviews', err)
    throw err
  }
}

export async function addReview(review) {
  try {
    const addedReview = await reviewService.add(review)
    store.dispatch(getActionAddReview(addedReview))
    const { score } = addedReview.byUser
    store.dispatch({ type: SET_SCORE, score })
  } catch (err) {
    console.log('ReviewActions: err in addReview', err)
    throw err
  }
}

export async function removeReview(reviewId) {
  try {
    await reviewService.remove(reviewId)
    store.dispatch(getActionRemoveReview(reviewId))
  } catch (err) {
    console.log('ReviewActions: err in removeReview', err)
    throw err
  }
}

// Command Creators

export function setFilter(filterBy) {
  const cmd = {
    type: SET_FILTER_BY,
    filterBy
  }
  store.dispatch(cmd)
}

export function getActionRemoveReview(reviewId) {
  return { type: REMOVE_REVIEW, reviewId }
}
export function getActionAddReview(review) {
  return { type: ADD_REVIEW, review }
}
