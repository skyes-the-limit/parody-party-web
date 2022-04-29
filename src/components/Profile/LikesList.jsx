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

const LikesList = ({ user, yours }) => {
  const [likedParodies, setLikedParodies] = useState(undefined)

  useEffect(() => {
    if (likedParodies === undefined) {
      const foundParodies = []
      user.likes.forEach(parodyId => {
        parodyService.findParodyById(parodyId).then(response => {
          foundParodies.push(response)
          setLikedParodies(foundParodies)
        })
      })
      setLikedParodies(foundParodies)
    }
  }, [user, likedParodies])

  return (
    <div className='mt-4'>
      <h2>{yours ? 'Your' : `${user.username}'s`} Favorite Parodies</h2>
      {likedParodies && likedParodies.length === 0 && (
        <p>It looks like {yours ? 'you haven\'t' : `${user.username} hasn't`} liked any parodies yet!</p>
      )}
      {likedParodies && likedParodies.length > 0 && (
        <ul className='list-group'>
          {likedParodies && likedParodies.map((parody, index) => (
            <ParodyPreview parody={parody} key={`parody-${index}`} />
          ))}
        </ul>
      )}
    </div>
  )
}

LikesList.propTypes = {
  user: userShape.isRequired,
  yours: PropTypes.bool
}

export default LikesList
