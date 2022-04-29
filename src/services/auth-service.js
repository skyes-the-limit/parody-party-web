import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const AUTH_API = `${API_BASE}/auth`

const api = axios.create({ withCredentials: true })

export const signUp = async (displayName, username, password) => {
  const response = await api.post(`${AUTH_API}/signup`, { displayName, username, password })
  return response.data
}

export const logIn = async (username, password) => {
  const response = await api.post(`${AUTH_API}/login`, { username, password })
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

const likeParody = async (parodyId) => {
  const response = await api.post(`${AUTH_API}/like/${parodyId}`)
  return response.data
}

export default {
  signUp,
  logIn,
  profile,
  logout,
  likeParody
}
