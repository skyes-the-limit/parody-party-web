import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const PARODY_API = `${API_BASE}/parody`

// From parody-controller.js:
// app.get(PARODY_API_BASE, findAllParodies)
// app.get(`${PARODY_API_BASE}/:id`, findParodyById)
// app.get(`${PARODY_API_BASE}/author/:author`, findParodyByAuthor)
// app.get(`${PARODY_API_BASE}/original/:originalGeniusID`, findParodyByOriginal)
// app.post(PARODY_API_BASE, createParody)
// app.put(`${PARODY_API_BASE}/lyrics`, updateParodyLyrics)
// app.delete(`${PARODY_API_BASE}/:id`, deleteParody)

const findParodyByOriginal = async (originalGeniusID) => {
  const response = await axios.get(`${PARODY_API}/original/${originalGeniusID}`)
  return response.data
}

const findParodyById = async (parodyId) => {
  const response = await axios.get(`${PARODY_API}/${parodyId}`)
  return response.data
}

export default {
  findParodyByOriginal,
  findParodyById
}
