import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const PARODY_API = `${API_BASE}/parody`

const findAllParodies = async () => {
  const response = await axios.get(PARODY_API)
  return response.data
}

const findVerifiedParodies = async () => {
  const response = await axios.get(`${PARODY_API}/verified`)

  let foundParodies = []
  response.data.forEach(author => {
    foundParodies = foundParodies.concat(author.parodies)
  })

  return foundParodies
}

const findParodiesByOriginal = async (originalGeniusID) => {
  const response = await axios.get(`${PARODY_API}/original/${originalGeniusID}`)
  return response.data
}

const findVerifiedParodiesByOriginal = async (originalGeniusID) => {
  // TODO: Implement this in the server in a proper Mongo way
  const response = await findVerifiedParodies()
  return response.filter(parody => { return parody.originalGeniusID === originalGeniusID })
}

const findParodyById = async (parodyId) => {
  const response = await axios.get(`${PARODY_API}/id/${parodyId}`)
  return response.data
}

const findParodiesByAuthor = async (authorUsername) => {
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
  findVerifiedParodies,
  findParodiesByOriginal,
  findVerifiedParodiesByOriginal,
  findParodyById,
  findParodiesByAuthor,
  createParody,
  updateParody,
  deleteParody
}
