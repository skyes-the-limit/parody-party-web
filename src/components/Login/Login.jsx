import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'

import { login, createAccount } from '../../actions/users-actions'

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
          <Field name="username" />
          {(errors.username && touched.username) &&
            <div>{errors.username}</div>
          }

          <label htmlFor='password'>Password</label>
          <Field type="password" name="password" />
          {(errors.password && touched.password) &&
            <div>{errors.password}</div>
          }

          {errors.email && touched.email ? <div>{errors.email}</div> : null}
          <button type="submit" disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}>Submit</button>
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
  if (Object.keys(user).length !== 0) {
    return (<Navigate replace to="/profile" />)
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
