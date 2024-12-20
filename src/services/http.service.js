import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true
})

export const httpService = {
  get(endpoint, data) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint, data) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint, data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint, data) {
    return ajax(endpoint, 'DELETE', data)
  }
}

async function ajax(endpoint, method = 'GET', data = null) {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null
    })
    return res.data
  } catch (err) {
    console.log(`Had issues ${method}ing to the backend, endpoint: ${endpoint}, with data:`, data)
    console.dir(err)

    if (err.res && err.res.status === 401) {
      sessionStorage.clear()
      window.location.assign('/')
      throw new Error("Can't Log")
    }

    throw err
  }
}
