import { reviewReducer } from './reducers/review.reducer.js'
import { toyReducer } from './reducers/toy.reducer.js'
import { userReducer } from './reducers/user.reducer.js'

import { combineReducers, compose, legacy_createStore as createStore } from 'redux'

const rootReducer = combineReducers({
  toyModule: toyReducer,
  userModule: userReducer,
  reviewModule: reviewReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

// * For Debugging
window.gStore = store

// console.log(store.getState().toyModule.filterBy)
// console.log(store.getState().toyModule.toys)

// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })
