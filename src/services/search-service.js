import axios from 'axios'

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api'
const SEARCH_API = `${API_BASE}/search`

const searchSongs = async (query) => {
  const response = await axios.get(`${SEARCH_API}/${query}`)
  const results = response.data
  return results
}

export default {
  searchSongs
}
