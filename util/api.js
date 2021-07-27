import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:4000'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 5000
})

module.exports = service
