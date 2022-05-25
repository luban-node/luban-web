import axios from 'axios'
import store from '../vuex/store'

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
    'Authorization': store.getters.user ? 'Bearer ' + store.getters.user.token : ''
  }
})

instance.interceptors.response.use(res => {
  const status = res.status
  switch (status) {
    case 404:
      break
    case 500:
      break
    default:
      {
        const { code, msg, data } = res.data
        if (code !== 0) {
          return Promise.reject(msg)
        }
        return Promise.resolve(data)
      }
  }
}, error => {
  return Promise.reject(error)
})

function qrCreate(data) {
  return instance({
    url: '/qr/create',
    method: 'POST',
    data
  })
}

function dyWm(data) {
  return instance({
    url: '/wm/dy',
    method: 'POST',
    data
  })
}

function uploadImage(data) {
  return instance({
    url: '/upload/image',
    method: 'POST',
    data
  })
}

function ocr(data) {
  return instance({
    url: '/ocr',
    method: 'POST',
    data
  })
}

function register(data) {
  return instance({
    url: '/register',
    method: 'POST',
    data
  })
}

function login(data) {
  return instance({
    url: '/login',
    method: 'POST',
    data
  })
}

function logout(){
  return instance({
    url:'logout',
    method:'POST'
  })
}

export { qrCreate, dyWm, uploadImage, ocr, register, login,logout }
