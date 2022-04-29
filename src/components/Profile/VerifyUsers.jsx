import React, { useEffect, useState } from 'react'
import userShape from '../../definitions/user-shape'
import usersService from '../../services/users-service'

// app.post(`${USERS_API_BASE}/verification`, findUsersAwaitingVerification)

const UserListItem = ({ user }) => {
  return (
    <li className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'>
      {JSON.stringify(user)}
    </li>
  )
}

UserListItem.propTypes = {
  user: userShape
}

const VerifyUsers = () => {
  const [users, setUsers] = useState(undefined)

  useEffect(() => {
    if (users === undefined) {
      usersService.findUsersAwaitingVerification().then(response => {
        setUsers(response)
      })
    }
  }, [users])

  console.log(users)

  return (
    <h1>Verify Users Here</h1>
  )
}

export default VerifyUsers
