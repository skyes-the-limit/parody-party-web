import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const AUTH_API = `${API_BASE}/auth`

const api = axios.create({ withCredentials: true })

export const signUp = async (username, password) => {
  const response = await api.post(`${AUTH_API}/signup`, { username, password })
  return response.data
}

export const signIn = async (username, password) => {
  console.log(`url: ${AUTH_API}/signup`)
  console.log(username)
  console.log(password)
  const response = await api.post(`${AUTH_API}/signin`, { username, password })
  console.log(response)
  return response.data
}

export const profile = async () => {
  const response = await api.post(`${AUTH_API}/profile`)
  return response.data
}

export const logout = async () => {
  const response = await api.post(`${AUTH_API}/logout`)
  return response.data
}

export default {
  signUp,
  signIn,
  profile,
  logout
}