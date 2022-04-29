import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import searchService from '../../services/genius-service.js'
import parodyService from '../../services/parody-service.js'
import songShape from '../../definitions/song-shape.js'
import parodyShape from '../../definitions/parody-shape.js'

const ParodyPreview = ({ parody }) => {
  return (
    <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
      <Link
        to={`/details/${parody.originalGeniusID}/${parody._id}`}
        style={{ textDecoration: 'none', color: '#3e3f3a' }}
      >
        {parody.title} by {parody.author}
      </Link>
      <span className='badge bg-primary rounded-pill'>{parody.likes} likes</span>
    </li>
  )
}

const Song = ({ song }) => {
  const [results, setResults] = useState(null)

  useEffect(() => {
    parodyService.findVerifiedParodiesByOriginal(song.id).then((response) => { setResults(response) })
  }, [song])

  return (
    <div className='card mb-3'>
      <h3 className='card-header'>{song.title}</h3>
      <div className='card-body'>
        <h5 className='card-title mb-0'>{song.artist_names}</h5>
        {!results && (
          <span className='text-muted'>Loading...</span>
        )}
        {results && results.length === 0 && (
          <h6 className='card-subtitle text-muted mt-2'>No parodies of this song yet</h6>
        )}
      </div>
      {results && results.length > 0 && (
        <ul className='list-group list-group-flush'>
          {results.map((parody, index) => (
            <ParodyPreview parody={parody} key={`${song.full_title}-parody-${index}`} />
          ))}
        </ul>
      )}
      <div className='card-footer'>
        <Link to={`/details/${song.id}/`} className='card-link'>
          <button type='button' className='btn btn-dark'>
            Parody this song
          </button>
        </Link>
        <Link to={song.url} className='card-link' target='_blank' rel='noopener noreferrer'>
          <button type='button' className='btn btn-link'>
            View on Genius
          </button>
        </Link>
      </div>
    </div>
  )
}

const SearchResults = () => {
  const [results, setResults] = useState(null)
  const { query } = useParams()

  useEffect(() => {
    searchService.searchSongs(query).then((response) => { setResults(response.hits) })
  }, [query])

  if (!results) {
    return (
      <div className='mt-4 mx-auto' style={{ maxWidth: '48em' }}>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className='mt-4 mx-auto' style={{ maxWidth: '48em' }}>
      <h1 className='mb-4'>
        Results for &quot;{query}&quot;
      </h1>

      {results && results.map((hit, index) => {
        return (
          <Song key={`songs-${index}`} song={hit.result} />
        )
      })}
    </div>
  )
}

Song.propTypes = {
  song: songShape
}

ParodyPreview.propTypes = {
  parody: parodyShape
}

export default SearchResults
