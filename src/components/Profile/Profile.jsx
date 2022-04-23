import React, { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findByUsername } from '../../actions/users-actions'

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const { username } = useParams()
  const dispatch = useDispatch()

  const getLoggedInUser = () => useSelector(state => state.user)
  const getUserFromParams = () => findByUsername(dispatch, username)

  // TODO: Breaks rules of hooks: https://reactjs.org/link/rules-of-hooks
  // /profile/:username does not rerender after Promise has resolved
  const user = useMemo(() => {
    const user = username ? getUserFromParams() : getLoggedInUser()
    Promise.resolve(user).then(setLoading(false))
    return user
  }, [username])

  if (loading) {
    return (
      <div>Loading...</div>
    )
  }

  // /profile/:username URL param returns 404
  if (username && !loading && !user) {
    return (
      <div>{username} not found.</div>
    )
  }

  // /profile and not logged in
  if (!username && !loading && !user) {
    return (
      <div>Not logged in.</div>
      // <Navigate replace to='/login' />
    )
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>{username ? '' : 'Welcome, '}{user.username}</h2>
      <h2>Role: {user.role}</h2>
    </div>
  )
}

export default Profile
