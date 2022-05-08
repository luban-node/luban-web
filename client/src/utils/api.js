import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
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

function qrCreate (data) {
  return instance({
    url: '/qr/create',
    method: 'POST',
    data
  })
}

function dyWm (data) {
  return instance({
    url: '/wm/dy',
    method: 'POST',
    data
  })
}

export { qrCreate, dyWm }
