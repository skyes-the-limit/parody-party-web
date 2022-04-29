import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const PARODY_API = `${API_BASE}/parody`

const findAllParodies = async () => {
  const response = await axios.get(PARODY_API)
  return response.data
}

const findParodyByOriginal = async (originalGeniusID) => {
  const response = await axios.get(`${PARODY_API}/original/${originalGeniusID}`)
  return response.data
}

const findParodyById = async (parodyId) => {
  const response = await axios.get(`${PARODY_API}/${parodyId}`)
  return response.data
}

const findParodyByAuthor = async (authorUsername) => {
  const response = await axios.get(`${PARODY_API}/author/${authorUsername}`)
  return response.data
}

const createParody = async (parody) => {
  const response = await axios.post(PARODY_API, parody)
  return response.data
}

const updateParody = async (parody) => {
  const response = await axios.put(PARODY_API, parody)
  return response.data
}

const deleteParody = async (parodyId) => {
  const response = await axios.delete(`${PARODY_API}/${parodyId}`)
  return response.data
}

export default {
  findAllParodies,
  findParodyByOriginal,
  findParodyById,
  findParodyByAuthor,
  createParody,
  updateParody,
  deleteParody
}
