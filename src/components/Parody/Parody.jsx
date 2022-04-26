import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import parodyService from '../../services/parody-service.js'
import geniusService from '../../services/genius-service.js'
import CreateParodyForm from './CreateParodyForm.jsx'

/*
The details page allow users to view a details view of the search result. They can see more information when they click
on the search result. The details page must fulfill the following requirements.
[ ] Must retrieve details from the remote API based on some unique identifier provided as a parameter from the
    search/results page
[ ] Must display additional related data from the local database. For instance, if you are displaying the details of a
    movie, some other folks might have reviewed the movie. All reviews related to the movie must be shown in all or
    partial form
[ ] Must provide links to related data/users. For instance, if you are displaying the details of a movie, and below you
    are displaying a list of reviews for that movie, provide links to the profile pages of folks who wrote the reviews
    for the movie
[ ] Must be mapped to /details/{unique identifier} or /details?identifier={unique identifier} where unique identifier
    uniquely identies the item being displayed

*/

const MODE = {
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  VIEW: 'VIEW'
}

const Parody = ({ mode }) => {
  const [original, setOriginal] = useState(null)
  const [parody, setParody] = useState(null)
  const { originalId, parodyId } = useParams()

  useEffect(() => {
    if (!original) {
      geniusService.getSongById(originalId).then((response) => { setOriginal(response.song) })
    }
  }, [original, originalId])

  useEffect(() => {
    if (!parody && mode !== MODE.CREATE) {
      parodyService.findParodyById(parodyId).then((response) => { setParody(response) })
    }
  }, [mode, parody, parodyId])

  if (!original) {
    return (
      <div>Loading...</div>
    )
  }
  console.log(parody)
  console.log(original)

  return (
    <div>
      <h1>Parody Page</h1>
      {original && (
        <div>
          <h5>Original:</h5>
          <h6>
            <a
              href={original.url}
              target='_blank'
              rel='noopener noreferrer'
            >
              {original.full_title}
            </a>
          </h6>
        </div>
      )}
      {parody && (
        <div>
          <h5>Parody:</h5>
          <h6>{parody.title} by {parody.author}</h6>
          <div style={{ whiteSpace: 'pre-wrap' }}>{parody.lyrics}</div>
        </div>
      )}
      {mode === MODE.CREATE && (
        <CreateParodyForm originalId={originalId} />
      )}
    </div>
  )
}

Parody.propTypes = {
  mode: PropTypes.oneOf([MODE.CREATE, MODE.EDIT, MODE.VIEW])
}

export default Parody
