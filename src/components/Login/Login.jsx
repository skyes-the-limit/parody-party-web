import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import { signUp, signIn, profile } from '../../services/auth-service'

/*
The login and register page allow users to register with the web site and then login later on
[X] Must allow users to register and create a new account
[X] Must allow choosing a role(s) for a user. For instance, when signing up you can provide a checkbox or radio button
    to select the role or roles. Alternatively provide an admin role and admin page that allows configuring user role(s)
[X] Must allow login in and identifying themselves
[ ] Must disallow access to at least one Web page unless logged in
[ ] Must allow access to all other Web pages even when not logged in
[ ] Must adapt content based on whether user is logged in or not for at least the Home page and Profile page
[ ] Must force login only when identity is required. For instance, an anonymous user might search for movies and visit
    the details page for a particular movie without needing to login. But if they attempt to like the movie, or rate it,
    or comment on it, or write a review, or follow someone, the application must request the user to login. Most of the
    Web application must be available without login (see me if not)
[X] Must be mapped to /login if both login and register are implemented in the same page
[X] The login and register page can be implemented as a single page or as two separate pages. In that case the login
    page must be mapped to /login and the register page must be mapped to /register

*/

const MODE = {
  LOGIN: 'LOGIN',
  SIGNUP: 'SIGNUP'
}

const AccountForm = ({ handleSubmit, mode }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          {mode === MODE.SIGNUP && (
            <div className='form-group'>
              <label htmlFor='displayName' className='form-label mt-4'>Display Name</label>
              <Field name='displayName' className='form-control' />
              {(errors.displayName && touched.displayName) &&
                <small className='invalid-feedback'>
                  {errors.displayName}
                </small>
              }
            </div>
          )}

          <div className='form-group'>
            <label htmlFor='username' className='form-label mt-4'>Username</label>
            <Field name='username' id="usernameField" className='form-control' />
            {(errors.username && touched.username) &&
              <small className='invalid-feedback'>
                {errors.username}
              </small>
            }
          </div>

          <div className='form-group'>
            <label htmlFor='password' className='form-label mt-4'>Password</label>
            <Field type='password' name='password' id="passwordField" className='form-control' />
            {(errors.password && touched.password) &&
              <small className='invalid-feedback'>
                {errors.password}
              </small>
            }
          </div>

          <button
            type='submit'
            disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}
            className='btn btn-primary mt-4'
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([MODE.LOGIN, MODE.SIGNUP])
}

const SignupSchema = Yup.object().shape({
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

const Login = () => {
  const [user, setUser] = useState(null)
  const [mode, setMode] = useState(MODE.LOGIN)

  useEffect(() => {
    profile().then(response => {
      console.log(response)
      setUser(response)
    })
  })

  // If the user is already logged in, redirect to the profile page
  if (user) {
    return <Navigate replace to='/profile' />
  }

  const submitLogin = (values) => {
    signIn(values.username, values.password).then(response => {
      setUser(response)
    })
  }

  const submitCreateAccount = (values) => {
    signUp(values.username, values.password).then(response => {
      setUser(response)
    })
  }

  return (
    <div className='mt-4 d-flex justify-content-center'>
      <div className='card border-primary mb-3' style={{ width: '32em' }}>
        <div className='card-header p-0'>
          <div className='btn-group w-100' role='group' aria-label='Basic radio toggle button group'>
            <input
              type='radio'
              className='btn-check'
              name='btnradio'
              id='loginToggle'
              autoComplete='off'
              checked={mode === MODE.LOGIN}
              onChange={() => setMode(MODE.LOGIN)}
            />
            <label className='btn btn-outline-primary border-0' htmlFor='loginToggle'>Log In</label>
            <input
              type='radio'
              className='btn-check'
              name='btnradio'
              id='signupToggle'
              autoComplete='off'
              checked={mode === MODE.SIGNUP}
              onChange={() => setMode(MODE.SIGNUP)}
            />
            <label className='btn btn-outline-primary border-0' htmlFor='signupToggle'>Sign Up</label>
          </div>
        </div>
        <div className='card-body pt-0'>
          {mode === MODE.LOGIN && (
            <AccountForm handleSubmit={submitLogin} mode={MODE.LOGIN} />
          )}

          {mode === MODE.SIGNUP && (
            <AccountForm handleSubmit={submitCreateAccount} mode={MODE.SIGNUP} />
          )}
        </div>
      </div>
    </div >
  )
}

export default Login
