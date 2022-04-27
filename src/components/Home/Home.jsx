import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import parodyService from '../../services/parody-service.js'
import parodyShape from '../../definitions/parody-shape.js'

/*
Home - this is the landing page of your web application. It is the first page users should see when they visit your
website. The home page must fulfill the following requirements.
[X] Must be mapped to either the root context ("/") or ("/home").
[X] Must be the first page when visiting the website
[ ] Must display generic content for anonymous users. The content must be dynamic based on the latest data. For
    instance, you might display snippets and links to the most recent post, review, or member who recently joined
[ ] Must display specific content for the logged in user. The content must be dynamic based on the most recent data
    entered by the logged in user. For instance, you might display snippets and links to the most recent post or review
    created by the logged in user
[ ] Must be clear to what the Web site is about and must look polished and finished
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
  const [results, setResults] = useState(null)
  const loggedInUser = null // TODO

  useEffect(() => {
    parodyService.findAllParodies().then((response) => { setResults(response) })
  })

  return (
    <div className='mt-4'>
      <h2>Top Parodies</h2>
      <ul className='list-group'>
        {results && results.map((parody, index) => (
          <ParodyPreview parody={parody} key={`parody-${index}`} />
        ))}
      </ul>

      {loggedInUser && (
        <>
          <h2>Your Parodies</h2>
          <ul className='list-group'>
            {results && results.map((parody, index) => (
              <ParodyPreview parody={parody} key={`parody-${index}`} />
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

export default Home
