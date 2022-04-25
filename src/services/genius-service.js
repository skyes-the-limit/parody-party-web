import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const GENIUS_API = `${API_BASE}/genius`

const searchSongs = async (query) => {
  const response = await axios.get(`${GENIUS_API}/search/${query}`)
  const results = response.data
  return results
}

const getSongById = async (id) => {
  const response = await axios.get(`${GENIUS_API}/songs/${id}`)
  const results = response.data
  return results
}

export default {
  searchSongs,
  getSongById
}
