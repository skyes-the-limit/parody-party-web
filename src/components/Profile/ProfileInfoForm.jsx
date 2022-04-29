/* eslint-disable max-len */
import React, { useState } from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import cx from 'classnames'

import userShape from '../../definitions/user-shape'
import usersService from '../../services/users-service'

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

const ProfileInfoForm = ({ initialUser }) => {
  const [user, setUser] = useState(initialUser)

  const updateDisplayName = (newDisplayName) => {

  }

  const updatePassword = (newPassword) => {

  }

  const requestVerification = () => {
    usersService.requestVerification(user._id).then((response) => {
      // Force re-render by reassigning state
      setUser({
        ...user,
        requestedVerification: true
      })
    })
  }

  return (
    <div className='card border-primary mb-3' style={{ maxWidth: '32em' }}>
      <div className='card-header'>
        <h2 className='m-0'>Account Info</h2>
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
                      onClick={updateDisplayName(values.displayName)}
                    >
                      Update
                    </button>
                  </div>
                  <small id='displayNameHelp' className='form-text text-muted'>
                    Your display name is how other users see you
                  </small>
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
                    onClick={updatePassword(values.password)}
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

              {user.role === 'user' && (
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
                      disabled={user.requestedVerification}
                      onClick={requestVerification}
                    >
                      {user.requestedVerification ? 'Awaiting Verification' : 'Request Verification'}
                    </button>
                  </div>
                  {user.role === 'user' && (
                    <small id='displayNameHelp' className='form-text text-muted'>
                      Your parodies will be unlisted until an admin verifies your account.
                    </small>
                  )}
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

ProfileInfoForm.propTypes = {
  initialUser: userShape
}

export default ProfileInfoForm
