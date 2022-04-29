import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import userShape from '../../definitions/user-shape'
import usersService from '../../services/users-service'

const UserListItem = ({ user, removeUser }) => {
  return (
    <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
      <Link
        to={`/profile/${user.username}`}
        style={{ textDecoration: 'none', color: '#3e3f3a' }}
      >
        {user.displayName || user.username}
      </Link >
      <button
        className='btn btn-primary'
        type='button'
        id={`verify-${user.username}`}
        onClick={() => {
          usersService.grantCreatorRole(user._id).then(response => removeUser(user._id))
        }}
      >
        Verify
      </button>
    </li>
  )
}

UserListItem.propTypes = {
  user: userShape,
  removeUser: PropTypes.func
}

const VerifyUsers = () => {
  const [users, setUsers] = useState(undefined)

  const removeUser = (userId) => {
    setUsers(users.filter(user => { return user._id !== userId }))
  }

  useEffect(() => {
    if (users === undefined) {
      usersService.findUsersAwaitingVerification().then(response => {
        setUsers(response)
      }).catch(error => {
        if (error.response.status === 404) {
          setUsers([])
        } else {
          throw error
        }
      })
    }
  }, [users])

  return (
    <div className='mt-4'>
      <h2>Verify Users</h2>
      {users && users.length === 0 && (
        <p>No users currently await verification</p>
      )}
      {users && users.length > 0 && (
        <ul className='list-group'>
          {users && users.map((user, index) => (
            <UserListItem key={`user-${index}`} user={user} removeUser={removeUser} />
          ))}
        </ul>
      )}
    </div>
  )
}

export default VerifyUsers
