import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import service from '../../services/search-service.js'

const SearchResults = () => {
  const [results, setResults] = useState(null)
  const { query } = useParams()

  useEffect(() => {
    service.searchSongs(query).then((response) => { setResults(response.hits) })
  }, [query])

  if (!results) { return <div>Loading...</div> }
  console.log(results)

  return (
    <div>
      <h1>Search Results Page</h1>
      {results && (
        <ul>
          {results.map((hit, index) => {
            return <li key={index}>{hit.result.full_title}</li>
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchResults
