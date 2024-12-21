import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
  login,
  logout,
  signup,
  getById,
  getLoggedinUser,
  updateScore,
  updatePrefs,
  getEmptyCredentials
}
async function login({ username, password }) {
  try {
    const loginUser = await httpService.post(BASE_URL + 'login', { username, password })
    if (loginUser) return _setLoggedinUser(loginUser)
    else return Promise.reject('Invalid login')
  } catch (err) {
    console.log(`Cannot post login with user details`, err)
    throw new Error('Error with login, Please try again later...')
  }
}

async function signup({ username, password, fullname }) {
  const user = { username, password, fullname, score: 10000 }

  try {
    const signUpUser = await httpService.post(BASE_URL + 'signup', user)
    if (signUpUser) return _setLoggedinUser(signUpUser)
    else return Promise.reject('Invalid signup')
  } catch (err) {
    console.log(`Cannot post signup with user details`, err)
    throw new Error('Error with signup, Please try again later...')
  }
}

async function logout() {
  try {
    await httpService.post(BASE_URL + 'logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
  } catch (err) {
    console.log(`Cannot logout`, err)
    throw new Error('Error with logout, Please try again later...')
  }
}

async function updatePrefs(user) {
  try {
    const updatedUser = await httpService.put(`user/${user._id}`, user)
    _setLoggedinUser(updatedUser)
    return updatedUser
  } catch (err) {
    console.log(`Cannot update user prefs`, err)
    throw new Error('Error with user prefs, Please try again later...')
  }
}

async function updateScore(diff) {
  try {
    if (getLoggedinUser().score + diff < 0) return Promise.reject('No credit')
    const user = await httpService.put('user', { diff })
    _setLoggedinUser(user)
  } catch (err) {
    console.log(`Cannot update user score`, err)
    throw new Error('Error with user score, Please try again later...')
  }
}

async function getById(userId) {
  try {
    const { data } = await httpService.get('/api/user/' + userId)
    return data
  } catch (err) {
    console.log(`Cannot get user`, err)
    throw new Error('Error with getting user, Please try again later...')
  }
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
  const userToSave = {
    _id: user._id,
    fullname: user.fullname,
    score: user.score,
    isAdmin: user.isAdmin,
    profileColor: user.profileColor
  }
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
  return userToSave
}

function getEmptyCredentials() {
  return {
    username: '',
    password: '',
    fullname: ''
  }
}

// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})
