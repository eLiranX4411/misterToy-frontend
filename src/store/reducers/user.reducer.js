import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const IS_SIGNUP = 'IS_SIGNUP'
export const SET_SCORE = 'SET_SCORE'

const userInitialState = {
  loggedInUser: userService.getLoggedinUser(),
  isSignup: false
}

export function userReducer(state = userInitialState, cmd = {}) {
  switch (cmd.type) {
    case SET_USER:
      return { ...state, loggedInUser: cmd.user }

    case IS_SIGNUP:
      return { ...state, isSignup: cmd.isSignup }

    case SET_SCORE:
      return {
        ...state,
        loggedInUser: {
          ...state.loggedInUser,
          score: cmd.score // Update only the score field
        }
      }

    default:
      return state
  }
}
