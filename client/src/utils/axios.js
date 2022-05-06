import axios from 'axios'

const instance = axios.create({
  timeout: 60 * 1000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
