/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useParams } from 'react-router-dom'

import usersService from '../../services/users-service'
import authService from '../../services/auth-service'
import ProfileInfoForm from './ProfileInfoForm'
import ParodyList from '../ParodyList/ParodyList'
import LikesList from './LikesList'
import VerifyUsers from './VerifyUsers'

/*
The profile page where users can see all the information about themselves and other users. It could have several
sections for personal information, other people they are following, who is following them, and links to related content
associate with the user. It could hide some personal information depending on who is logged in and how a user configured
their profile

[ ] Must allow users to change their personal information. If a user is logged in then they can see their profile
    including sensitive information such as email and phone
[X] Must be accessible to other users including anonymous users
[X] Must hide personal/private information from others visiting the profile. If a user is visiting someone else's
    profile, then they can't see that other user's sensitive information
[X] Must be mapped to '/profile' for displaying the profile of the currently logged in user
[X] Must be mapped to '/profile/{profileId}' for displaying someone elses profile
[X] Must group similar/related data into distinguishable groups, e.g., Following, Followers, Review, Favorites, etc.

[ ] Must display lists of snippets and links of all data related to a user. For instance, display a list of links to all
    the favorite movies, list of links of users they are following, etc. For instance:
    [ ] If user is following other users, then those users must be listed in the profile and a link must navigate to
        that other users profile
    [ ] If the user has bookmarked something, then it should be listed in the profile and a link must navigate to that
        something
    [ ] If the user has commented, or reviewed, or created some content, then there must be a functionality to list a
        summary of that content and navigate to that content
    [ ] You decide how to present, display, format the information
[ ] The profile page may be implemented as several pages
*/

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(undefined)
  const { username } = useParams() || null
  const locationRoute = useLocation()

  useEffect(() => {
    setUser(undefined)
  }, [locationRoute])

  useEffect(() => {
    if (user === undefined) {
      if (username) {
        usersService.findUserByUsername(username).then(response => {
          setUser(response)
          setLoading(false)
        }).catch((error) => {
          if (error.response.status === 404) {
            setUser(null)
            setLoading(false)
          } else {
            throw error
          }
        })
      } else {
        authService.profile().then(response => {
          setUser(response)
          setLoading(false)
        }).catch((error) => {
          if (error.response.status === 403) {
            // TODO: Caught 'error' HTTP status still logs to console
            setUser(null)
            setLoading(false)
          } else {
            throw error
          }
        })
      }
    }
  })

  const logout = () => {
    authService.logout().then(() => {
      location.href = location.origin
    })
  }

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
      <Navigate replace to='/login' />
    )
  }

  return (
    <>
      {username && user && (
        <div className='mt-4'>
          <h1>{user.displayName || user.username}&#39;s Profile</h1>
          <ParodyList user={user} yours={false} />
          <LikesList user={user} yours={false} />
        </div>
      )}

      {!username && user && (
        <div>
          <div className='row'>
            <div className='d-flex align-items-center justify-content-between mt-4'>
              <h1 className='d-inline m-0'>Hello, {user.displayName || user.username}</h1>
              <button type='button' className='btn btn-dark' onClick={logout}>Logout</button>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md'>
              <ProfileInfoForm initialUser={user} />
            </div>
            <div className='col-md'>
              <ParodyList user={user} yours={true} />
              <LikesList user={user} yours={true} />
              {user.role === 'admin' && (
                <VerifyUsers />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile
