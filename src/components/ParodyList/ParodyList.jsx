import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import parodyService from '../../services/parody-service.js'
import parodyShape from '../../definitions/parody-shape.js'
import userShape from '../../definitions/user-shape.js'

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

const ParodyList = ({ user, yours }) => {
  const [yourParodies, setYourParodies] = useState(null)

  useEffect(() => {
    if (user && !yourParodies) {
      parodyService.findParodiesByAuthor(user.username).then((response) => { setYourParodies(response || []) })
    }
  }, [user, yourParodies])

  return (
    <div className='mt-4'>
      <h2>{yours ? 'Your' : `${user.username}'s`} Parodies</h2>
      {yourParodies && yourParodies.length === 0 && (
        <p>It looks like {yours ? 'you haven\'t' : `${user.username} hasn't`} written any parodies yet!</p>
      )}
      {yourParodies && yourParodies.length > 0 && (
        <ul className='list-group'>
          {yourParodies && yourParodies.map((parody, index) => (
            <ParodyPreview parody={parody} key={`parody-${index}`} />
          ))}
        </ul>
      )}
    </div>
  )
}

ParodyList.propTypes = {
  user: userShape,
  yours: PropTypes.bool
}

export default ParodyList
