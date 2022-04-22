import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

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
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Username may not exceed 32 characters')
    .required('Required')
})

const submitLogin = (values) => {
  console.log(values)
}

const submitCreateAccount = (values) => {
  console.log(values)
}

const Login = () => {
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
