import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

import parodyService from '../../services/parody-service.js'
import geniusService from '../../services/genius-service.js'
import authService from '../../services/auth-service.js'
import MODE from '../../definitions/parody-mode.js'
import CreateOrEditParodyForm from './CreateOrEditParodyForm.jsx'

/*
The details page allow users to view a details view of the search result. They can see more information when they click
on the search result. The details page must fulfill the following requirements.
[X] Must retrieve details from the remote API based on some unique identifier provided as a parameter from the
    search/results page
[X] Must display additional related data from the local database. For instance, if you are displaying the details of a
    movie, some other folks might have reviewed the movie. All reviews related to the movie must be shown in all or
    partial form
[X] Must provide links to related data/users. For instance, if you are displaying the details of a movie, and below you
    are displaying a list of reviews for that movie, provide links to the profile pages of folks who wrote the reviews
    for the movie
[X] Must be mapped to /details/{unique identifier} or /details?identifier={unique identifier} where unique identifier
    uniquely identies the item being displayed

*/

const Parody = ({ initialMode = MODE.VIEW }) => {
  const [user, setUser] = useState(undefined)
  const [original, setOriginal] = useState(undefined)
  const [parody, setParody] = useState(undefined)
  const [mode, setMode] = useState(initialMode)
  const { originalId, parodyId } = useParams()

  useEffect(() => {
    if (user === undefined) {
      authService.profile().then(response => {
        setUser(response)
      }).catch((error) => {
        // TODO: Caught "error" HTTP status still logs to console
        if (error.response.status === 503) {
          setUser(null)
        } else {
          throw error
        }
      })
    }
  }, [user])

  useEffect(() => {
    if (original === undefined) {
      geniusService.getSongById(originalId).then((response) => { setOriginal(response.song) })
    }
  }, [original, originalId])

  useEffect(() => {
    if (parody === undefined) {
      if (mode !== MODE.CREATE) {
        parodyService.findParodyById(parodyId).then((response) => { setParody(response) })
      } else {
        setParody(null)
      }
    }
  }, [mode, parody, parodyId])

  const likeParody = () => {
    authService.likeParody(parody._id).then(() => {
      setUser(undefined)
      setParody(undefined)
    })
  }

  const deleteParody = () => {
    parodyService.deleteParody(parody._id).then(() => {
      location.href = `${location.origin}`
    })
  }

  if (!original || (!parody && mode !== MODE.CREATE)) {
    return (
      <div className='my-4 mx-auto' style={{ maxWidth: '48em' }}>
        <h6>Loading...</h6>
      </div>
    )
  }

  return (
    <div className='my-4 mx-auto' style={{ maxWidth: '48em' }}>
      <h6>Original:{' '}
        <a
          href={original.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {original.full_title}
        </a>
      </h6>

      {parody && mode === MODE.VIEW && (
        <>
          <div className='d-flex align-items-center justify-content-between my-4'>
            <h2 className='d-inline-block m-0'>
              {parody.title} by {' '}
              <Link
                to={`/profile/${parody.author}`}
              >
                {parody.author}
              </Link>
            </h2>
            {user && user.username === parody.author && (
              <button type='button' className='btn btn-dark' onClick={() => setMode(MODE.EDIT)}>Edit</button>
            )}
            {user && user.username !== parody.author && (
              <button type='button' className='btn btn-dark' onClick={likeParody}>
                {/* TODO: Copy properly switches from "Like" to "Liked" but not back for some reason */}
                {user.likes.includes(parodyId) ? 'Liked' : 'Like'}
              </button>
            )}
          </div>

          <div style={{ whiteSpace: 'pre-wrap' }}>{parody.lyrics}</div>

          {/* app.delete(`${PARODY_API_BASE}/:id`, deleteParody) */}
          <div className='my-4'>
            {user && user.username === parody.author && (
              <button type='button' className='btn btn-danger me-4' onClick={deleteParody}>Delete</button>
            )}
            <span className='badge bg-primary rounded-pill'>{parody.likes} likes</span>
          </div>
        </>
      )}

      {(mode === MODE.CREATE || mode === MODE.EDIT) && (
        <CreateOrEditParodyForm
          original={original}
          parody={mode === MODE.EDIT ? parody : null}
          setParody={setParody}
          mode={mode}
          setMode={setMode}
        />
      )}
    </div>

  )
}

Parody.propTypes = {
  initialMode: PropTypes.oneOf([MODE.CREATE, MODE.EDIT, MODE.VIEW])
}

export default Parody
