import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import parodyService from '../../services/parody-service.js'
import authService from '../../services/auth-service.js'
import parodyShape from '../../definitions/parody-shape.js'

/*
Home - this is the landing page of your web application. It is the first page users should see when they visit your
website. The home page must fulfill the following requirements.
[X] Must be mapped to either the root context ("/") or ("/home").
[X] Must be the first page when visiting the website
[X] Must display generic content for anonymous users. The content must be dynamic based on the latest data. For
    instance, you might display snippets and links to the most recent post, review, or member who recently joined
[X] Must display specific content for the logged in user. The content must be dynamic based on the most recent data
    entered by the logged in user. For instance, you might display snippets and links to the most recent post or review
    created by the logged in user
[X] Must be clear to what the Web site is about and must look polished and finished
*/

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

ParodyPreview.propTypes = {
  parody: parodyShape
}

const Home = () => {
  const [topParodies, setTopParodies] = useState(null)
  const [yourParodies, setYourParodies] = useState(null)
  const [user, setUser] = useState(undefined)

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
    if (user && !yourParodies) {
      parodyService.findParodyByAuthor(user.username).then((response) => { setYourParodies(response || []) })
    }
  }, [user, yourParodies])

  useEffect(() => {
    parodyService.findAllParodies().then((response) => { setTopParodies(response) })
  }, [topParodies])

  return (
    <div className='mt-4'>
      <div className='text-center mb-5'>
        <h1>Welcome to Parody Party</h1>
        <p className='lead text-muted'>Your go-to portal for popular parodies of songs</p>
      </div>

      <h2>Top Parodies</h2>
      <ul className='list-group'>
        {topParodies && topParodies.map((parody, index) => (
          <ParodyPreview parody={parody} key={`parody-${index}`} />
        ))}
      </ul>

      {user && (
        <div className='mt-4'>
          <h2>Your Parodies</h2>
          {yourParodies && yourParodies.length === 0 && (
            <p>It looks like you haven&apos;t written any parodies yet!</p>
          )}
          {yourParodies && yourParodies.length > 0 && (
            <ul className='list-group'>
              {yourParodies && yourParodies.map((parody, index) => (
                <ParodyPreview parody={parody} key={`parody-${index}`} />
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}

export default Home
