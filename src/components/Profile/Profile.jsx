/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import cx from 'classnames'

import usersService from '../../services/users-service'
import authService from '../../services/auth-service'

/*
The profile page where users can see all the information about themselves and other users. It could have several
sections for personal information, other people they are following, who is following them, and links to related content
associate with the user. It could hide some personal information depending on who is logged in and how a user configured
their profile

[ ] Must allow users to change their personal information. If a user is logged in then they can see their profile
    including sensitive information such as email and phone
[X] Must be accessible to other users including anonymous users
[ ] Must hide personal/private information from others visiting the profile. If a user is visiting someone else's
    profile, then they can't see that other user's sensitive information
[X] Must be mapped to '/profile' for displaying the profile of the currently logged in user
[X] Must be mapped to '/profile/{profileId}' for displaying someone elses profile
[ ] Must group similar/related data into distinguishable groups, e.g., Following, Followers, Review, Favorites, etc.

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

const ProfileSchema = Yup.object().shape({
  displayName: Yup.string(),
  username: Yup.string()
    .min(4, 'Username must be at least 4 characters')
    .max(16, 'Username may not exceed 16 characters')
    .required('Required'),
  // TODO: Require lower/cap/symbols & restrict special characters
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password may not exceed 32 characters')
    .required('Required')
})

const Profile = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const { username } = useParams() || null

  useEffect(() => {
    if (!user) {
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
          console.log(response)
          setUser(response)
          setLoading(false)
        }).catch((error) => {
          if (error.response.status === 503) {
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

  console.log(user)

  return (
    <div>
      {username && user && (
        <h1>{user.displayName || user.username}&pos;s Profile</h1>
      )}

      {!username && user && (
        <div>
          <div className='row'>
            <div className='d-flex align-items-center justify-content-center mt-4'>
              <h1 className='d-inline mb-0 me-5'>Hello {user.displayName || user.username}</h1>
              <button type='button' className='btn btn-dark' onClick={() => authService.logout()}>Logout</button>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col'>
              <div className='card border-primary mb-3' style={{ maxWidth: '32em' }}>
                <div className='card-header'>
                  <h3 className='m-0'>Account Info</h3>
                </div>
                <div className='card-body'>
                  <Formik
                    initialValues={{
                      displayName: user.displayName || '',
                      username: user.username || '',
                      password: user.password || '',
                      role: user.role || ''
                    }}
                    validationSchema={ProfileSchema}
                    onSubmit={() => { }}
                  >
                    {({ values, errors, touched }) => (
                      <Form>
                        <div className='form-group'>
                          <label className='form-label'>Display name</label>
                          <div className='form-group'>
                            <div className='input-group'>
                              <Field
                                name='displayName'
                                type='text'
                                className='form-control'
                                aria-label='Your Display Name'
                                aria-describedby='update-displayName'
                              />
                              <button
                                className='btn btn-primary'
                                type='button'
                                id='update-displayName'
                                disabled={errors.displayName}
                                onClick={() => { console.log(values.displayName) }}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className='form-group'>
                          <label htmlFor='username' className='form-label mt-4'>Username</label>
                          <Field
                            name='username'
                            id='usernameField'
                            className='form-control'
                            readOnly
                          />
                          <small id='displayNameHelp' className='form-text text-muted'>
                            Your username is how you are uniquely identified
                          </small>
                        </div>

                        <div className={cx('form-group', (errors.password && touched.password) ? 'has-danger' : '')}>
                          <label htmlFor='password' className='form-label mt-4'>Password</label>
                          <div className='input-group'>
                            <Field
                              name='password'
                              id='passwordField'
                              type='password'
                              className={cx('form-control', (errors.password && touched.password) ? 'is-invalid' : '')}
                            />
                            <button
                              className='btn btn-primary'
                              type='button'
                              id='update-password'
                              disabled={errors.password}
                              onClick={() => { console.log(values.password) }}
                            >
                              Update
                            </button>
                          </div>
                          {(errors.password && touched.password) &&
                            <div className='invalid-feedback'>
                              {errors.password}
                            </div>
                          }
                        </div>

                        <div className='form-group'>
                          <label htmlFor='role' className='form-label mt-4'>Role</label>
                          <div className='input-group'>
                            <Field
                              name='role'
                              id='roleField'
                              className='form-control'
                              readOnly
                            />
                            <button
                              className='btn btn-primary'
                              type='button'
                              id='verify-role'
                              onClick={() => { console.log(values.role) }}
                            >
                              Request verification
                            </button>
                          </div>
                          {user.role === 'user' && (
                            <small id='displayNameHelp' className='form-text text-muted'>
                              Other users will not be able to see your parodies until an admin verifies your account.
                            </small>
                          )}
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div className='col'>
              Other column
              <h3>Your Parodies</h3>
              <h3>Your Comments</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
