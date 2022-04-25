import React from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'
import { useSelector } from 'react-redux'

import parodyService from '../../services/parody-service.js'

const CreateParodySchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  lyrics: Yup.string().required('Required')
})

const CreateParodyForm = ({ originalId }) => {
  const loggedInUser = useSelector(state => state.user)
  console.log('loggedInUser')
  console.log(loggedInUser)

  const submitCreateParody = (values) => {
    const parody = {
      originalGeniusID: originalId,
      author: 'tempAuthorName', // TODO: Get current username
      title: values.title,
      lyrics: values.lyrics
    }
    parodyService.createParody(parody).then((response) => console.log(response))
  }

  return (
    <Formik
      initialValues={{
        title: '',
        lyrics: ''
      }}
      validationSchema={CreateParodySchema}
      onSubmit={submitCreateParody}
    >
      {({ errors, touched }) => (
        <Form>
          <label htmlFor='title'>Title</label>
          <Field name='title' />
          {(errors.title && touched.title) &&
            <div>{errors.title}</div>
          }

          <label htmlFor='lyrics'>Lyrics</label>
          <Field
            name='lyrics'
            component="textarea"
            rows="4"
          />
          {(errors.lyrics && touched.lyrics) &&
            <div>{errors.lyrics}</div>
          }

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

CreateParodyForm.propTypes = {
  originalId: PropTypes.string
}

export default CreateParodyForm
