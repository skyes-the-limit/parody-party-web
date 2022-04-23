import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { login, createAccount } from '../../actions/users-actions'

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

const AccountForm = ({ handleSubmit }) => {
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
          <label htmlFor='username'>Username</label>
          <Field name='username' />
          {(errors.username && touched.username) &&
            <div>{errors.username}</div>
          }

          <label htmlFor='password'>Password</label>
          <Field type='password' name='password' />
          {(errors.password && touched.password) &&
            <div>{errors.password}</div>
          }

          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <button
            type='submit'
            disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  )
}

AccountForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
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
  // If the user is already logged in, redirect to the profile page
  const user = useSelector(state => state.user)
  if (user) {
    return <Navigate replace to='/profile' />
  }

  const dispatch = useDispatch()
  const submitLogin = (values) => {
    login(dispatch, values.username, values.password)
  }

  const submitCreateAccount = (values) => {
    createAccount(dispatch, values.username, values.password)
  }

  return (
    <div>
      <h1>Login Page</h1>

      <h2>Login</h2>
      <AccountForm handleSubmit={submitLogin} />

      <h2>Create Account</h2>
      <AccountForm handleSubmit={submitCreateAccount} />
    </div>
  )
}

export default Login
