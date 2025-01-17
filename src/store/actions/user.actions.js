import { store } from '../store.js'
import { SET_USER, IS_SIGNUP, SET_SCORE } from '../reducers/user.reducer.js'
import { userService } from '../../services/user.service.js'

export async function login(credentials) {
  try {
    const user = await userService.login(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot login', err)
    throw new Error(`Problem with login action, Please try again later...`)
  }
}

export async function signup(credentials) {
  try {
    const user = await userService.signup(credentials)
    store.dispatch({ type: SET_USER, user })
    return user
  } catch (err) {
    console.log('user actions -> Cannot signup', err)
    throw new Error(`Problem with signup action, Please try again later...`)
  }
}

export async function logout() {
  try {
    const user = await userService.logout()
    store.dispatch({ type: SET_USER, user: null })
    return user
  } catch (err) {
    console.log('user actions -> Cannot logout', err)
    throw new Error(`Problem with logout action, Please try again later...`)
  }
}

export async function updatePrefs(user) {
  try {
    const updatedUser = await userService.updatePrefs(user)
    store.dispatch({ type: 'SET_USER', user: updatedUser })
    return updatedUser
  } catch (err) {
    console.error('Error updating user', err)
    throw err
  }
}

export async function updateScore(diff) {
  try {
    const updatedUserScore = await userService.updateScore(diff)
    store.dispatch({ type: 'SET_SCORE', user: updatedUserScore })
    return updatedUserScore
  } catch (err) {
    console.error('Error updating score', err)
    throw err
  }
}

export async function updateUserImg(user) {
  try {
    const updatedUser = await userService.updateUserImg(user)
    store.dispatch({ type: 'SET_USER', user: updatedUser })
    return updatedUser
  } catch (err) {
    console.error('Error updating user', err)
    throw err
  }
}

export function toggleIsSignUp(isSignup) {
  store.dispatch({ type: IS_SIGNUP, isSignup })
}
