import { userService } from '../../services/user.service.js'

export const SET_USER = 'SET_USER'
export const IS_SIGNUP = 'IS_SIGNUP'

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

    default:
      return state
  }
}
