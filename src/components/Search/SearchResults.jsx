import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
// import { useSelector } from 'react-redux'

import searchService from '../../services/genius-service.js'
import parodyService from '../../services/parody-service.js'

const ParodyPreview = ({ song, parody }) => {
  return (
    <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
      <Link to={`/details/${song.id}/${parody._id}`} style={{ textDecoration: 'none', color: '#3e3f3a' }}>
        {parody.title} by {parody.author}
      </Link>
      <span className='badge bg-primary rounded-pill'>{parody.likes} likes</span>
    </li>
  )
}

const Song = ({ song }) => {
  const [results, setResults] = useState(null)
  // const loggedInUser = useSelector(state => state.user)
  // console.log('loggedInUser')
  // console.log(loggedInUser)
  console.log(song)

  useEffect(() => {
    parodyService.findParodyByOriginal(song.id).then((response) => { setResults(response) })
  }, [song])

  return (
    <div className='card mb-3'>
      <h3 className='card-header'>{song.title}</h3>
      {!results && (
        <div className='card-body'>
          <span className='text-muted'>Loading...</span>
        </div>
      )}
      <div className='card-body'>
        <h5 className='card-title'>{song.artist_names}</h5>
        {results && results.length === 0 && (
          <h6 className='card-subtitle text-muted'>No parodies of this song yet</h6>
        )}
      </div>
      {results && results.length > 0 && (
        <ul className='list-group list-group-flush'>
          {results.map((parody, index) => (
            <ParodyPreview song={song} parody={parody} key={`${song.full_title}-parody-${index}`} />
          ))}
        </ul>
      )}
      <div className='card-footer'>
        {/* Link should direct to Login if user is unauthenticated */}
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
    return <h1 className='mt-4 text-muted'>
      Loading...
    </h1>
  }

  return (
    <div className='mt-4 mx-auto' style={{ width: '48em' }}>
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

const songShape = PropTypes.shape({
  annotation_count: PropTypes.number,
  api_path: PropTypes.string,
  artist_names: PropTypes.string,
  full_title: PropTypes.string,
  header_image_thumbnail_url: PropTypes.string,
  header_image_url: PropTypes.string,
  id: PropTypes.number,
  lyrics_owner_id: PropTypes.number,
  lyrics_state: PropTypes.string,
  path: PropTypes.string,
  primary_artist: PropTypes.shape({
    api_path: PropTypes.string,
    header_image_url: PropTypes.string,
    id: PropTypes.number,
    image_url: PropTypes.string,
    iq: PropTypes.number,
    is_meme_verified: PropTypes.bool,
    is_verified: PropTypes.bool,
    name: PropTypes.string,
    url: PropTypes.string
  }),
  pyongs_count: PropTypes.number,
  song_art_image_thumbnail_url: PropTypes.string,
  song_art_image_url: PropTypes.string,
  stats: PropTypes.shape({
    hot: PropTypes.bool,
    pageviews: PropTypes.number,
    unreviewed_annotations: PropTypes.number
  }),
  title: PropTypes.string,
  title_with_featured: PropTypes.string,
  url: PropTypes.string
})

const parodyShape = PropTypes.shape({
  author: PropTypes.string,
  comments: PropTypes.array,
  date: PropTypes.date,
  likes: PropTypes.number,
  lyrics: PropTypes.string,
  originalGeniusID: PropTypes.number,
  title: PropTypes.string,
  _id: PropTypes.string
})

Song.propTypes = {
  song: songShape
}

ParodyPreview.propTypes = {
  song: songShape,
  parody: parodyShape
}

export default SearchResults
