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

function loginCallback(data){
  return instance({
    url:'loginCallback',
    method:'POST',
    data
  })
}

function loadWeiboQr(){
  return instance({
    url:`https://api.weibo.com/oauth2/qrcode_authorize/generate?client_id=3359969474&redirect_uri=http://127.0.0.1:8080/login&scope=&response_type=code&state=&__rnd=${Date.now()}`,
    method:'GET'
  })
}

export { qrCreate, dyWm, uploadImage, ocr, register, login,logout,loginCallback,loadWeiboQr }
