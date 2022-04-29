import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const USERS_API = `${API_BASE}/users`

const findUserByUsername = async (username) => {
  const response = await axios.get(`${USERS_API}/username/${username}`)
  const user = response.data
  return user
}

const findUsersAwaitingVerification = async () => {
  const response = await axios.get(`${USERS_API}/verification`)
  return response.data
}

const login = async (username, password) => {
  const response = await axios.post(`${USERS_API}/credentials`, { username, password })
  return response.data
}

const createAccount = async (username, password) => {
  const response = await axios.post(USERS_API, { username, password })
  return response.data
}

const grantCreatorRole = async (username) => {
  const response = await axios.post(`${USERS_API}/creator/`, { username })
  return response.data
}

const grantAdminRole = async (username) => {
  const response = await axios.post(`${USERS_API}/admin/`, { username })
  return response.data
}

// app.put(`${USERS_API_BASE}/verify/:id`, requestVerification)
const requestVerification = async (id) => {
  const response = await axios.put(`${USERS_API}/verify/${id}`)
  return response.data
}

const updateDisplayName = async (displayName) => {
  const response = await axios.post(`${USERS_API}/displayName/`, { displayName })
  return response.data
}

const updatePassword = async (password) => {
  const response = await axios.post(`${USERS_API}/password/`, { password })
  return response.data
}

export default {
  findUserByUsername,
  findUsersAwaitingVerification,
  login,
  createAccount,
  grantCreatorRole,
  grantAdminRole,
  requestVerification,
  updateDisplayName,
  updatePassword
}
