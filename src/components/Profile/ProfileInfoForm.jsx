/* eslint-disable max-len */
import React from 'react'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import cx from 'classnames'

import userShape from '../../definitions/user-shape'

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

const ProfileInfoForm = ({ user }) => {
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
                      onClick={() => { console.log(values.displayName) }} // TODO
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
                    onClick={() => { console.log(values.password) }} // TODO
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
                    onClick={() => { console.log(values.role) }} // TODO
                  >
                    Request verification
                  </button>
                </div>
                {user.role === 'user' && (
                  <small id='displayNameHelp' className='form-text text-muted'>
                    Your parodies will be unlisted until an admin verifies your account.
                  </small>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

ProfileInfoForm.propTypes = {
  user: userShape
}

export default ProfileInfoForm
