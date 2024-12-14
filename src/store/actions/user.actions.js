// import { userService } from '../../services/user.service.js'
import { store } from '../store.js'
import { SET_USER, SET_USER_BALANCE } from '../reducers/user.reducer.js'
import { userService } from '../../services/user.service.js'

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
      console.log('user actions -> Cannot login', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
      console.log('user actions -> Cannot signup', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
      console.log('user actions -> Cannot logout', err)
      throw err
    })
}

export function updateUser(user, color, bgColor, fullname) {
  const updatedUser = { ...user, color, bgColor, fullname }

  return userService
    .updateUserPrefs(updatedUser.color, updatedUser.bgColor, updatedUser.fullname)
    .then((savedUser) => {
      store.dispatch({ type: SET_USER, user: savedUser })
      return savedUser
    })
    .catch((err) => {
      console.log('Todo action -> Cannot save user prefs')
      throw err
    })
}

export function changeBalance(amount) {
  return userService
    .updateBalance(amount)
    .then((updatedBalance) => {
      store.dispatch({ type: SET_USER_BALANCE, balance: updatedBalance })
      return updatedBalance
    })
    .catch((err) => {
      console.log('user actions -> Cannot change balance', err)
      throw err
    })
}

export function addActivity(txt) {
  return userService
    .updateActivity(txt)
    .then((updatedActivityUser) => {
      store.dispatch({ type: SET_USER, user: updatedActivityUser })
      return updatedActivityUser
    })
    .catch((err) => {
      console.log('user actions -> Cannot dispatch activty', err)
      throw err
    })
}
