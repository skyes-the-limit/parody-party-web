import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { Field, Form, Formik } from 'formik'

import parodyService from '../../services/parody-service.js'
import authService from '../../services/auth-service.js'
import parodyShape from '../../definitions/parody-shape.js'
import songShape from '../../definitions/song-shape.js'
import MODE from '../../definitions/parody-mode.js'
import { Navigate } from 'react-router-dom'

const CreateParodySchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  lyrics: Yup.string().required('Required')
})

const CreateOrEditParodyForm = ({ original, parody, setParody, mode, setMode }) => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    if (user === undefined) {
      authService.profile().then(response => {
        setUser(response)
      }).catch((error) => {
        if (error.response.status === 503) {
          // TODO: Caught "error" HTTP status still logs to console
          setUser(null)
        } else {
          throw error
        }
      })
    }
  }, [user])

  if (user === null) {
    // TODO: somehow include error message to display?
    return <Navigate replace to='/login' />
  }

  const submitCreateParody = (values) => {
    const newParody = {
      originalGeniusID: original.id,
      author: user.username,
      title: values.title,
      lyrics: values.lyrics
    }

    if (mode === MODE.CREATE) {
      parodyService.createParody(newParody).then((response) => {
        location.href = `${location.href}${response._id}`
      })
    } else if (mode === MODE.EDIT) {
      newParody._id = parody._id
      parodyService.updateParody(newParody).then((response) => {
        setParody(newParody)
        setMode(MODE.VIEW)
      })
    }
  }

  return (
    <Formik
      initialValues={{
        title: parody ? parody.title : '',
        lyrics: parody ? parody.lyrics : ''
      }}
      validationSchema={CreateParodySchema}
      onSubmit={submitCreateParody}
    >
      {({ errors, touched }) => (
        <Form>

          <div className='form-group'>
            <label htmlFor='title' className='form-label mt-4'>Parody Title</label>
            <Field name='title' className='form-control' />
            {(errors.title && touched.title) &&
              <small className='invalid-feedback'>
                {errors.title}
              </small>
            }
          </div>

          <div className='form-group'>
            <label htmlFor='lyrics' className='form-label mt-4'>Lyrics</label>
            <Field name='lyrics'
              className='form-control'
              component="textarea"
              rows="16"
            />
            {(errors.lyrics && touched.lyrics) &&
              <small className='invalid-feedback'>
                {errors.lyrics}
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

CreateOrEditParodyForm.propTypes = {
  original: songShape.isRequired,
  parody: parodyShape,
  setParody: PropTypes.func.isRequired,
  mode: PropTypes.oneOf([MODE.CREATE, MODE.EDIT, MODE.VIEW]).isRequired,
  setMode: PropTypes.func.isRequired
}

export default CreateOrEditParodyForm
