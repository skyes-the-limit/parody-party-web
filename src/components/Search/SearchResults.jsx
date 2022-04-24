import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

import searchService from '../../services/search-service.js'
import parodyService from '../../services/parody-service.js'

const Song = ({ song }) => {
  const [results, setResults] = useState(null)
  console.log(song)

  useEffect(() => {
    parodyService.findParodyByOriginal(song.id).then((response) => { setResults(response) })
  }, [song])

  return (
    <div>
      <h6>{song.full_title}</h6>
      <ul>
        {results && results.length === 0 &&
          <li>No parodies written for this song yet!</li>
        }
        {results && results.length > 0 &&
          results.map((parody, index) => {
            return (
              <li key={`${song.full_title}-parody-${index}`}>
                {JSON.stringify(parody)}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

Song.propTypes = {
  song: PropTypes.shape({
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
}

const SearchResults = () => {
  const [results, setResults] = useState(null)
  const { query } = useParams()

  useEffect(() => {
    searchService.searchSongs(query).then((response) => { setResults(response.hits) })
  }, [query])

  if (!results) { return <div>Loading...</div> }
  console.log(results)

  return (
    <div>
      <h1>Search Results Page</h1>
      {results && results.map((hit, index) => {
        return (
          <Song key={`songs-${index}`} song={hit.result} />
        )
      })}
    </div>
  )
}

export default SearchResults
