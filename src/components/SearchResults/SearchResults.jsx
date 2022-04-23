import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import service from '../../services/search-service.js'

const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .required('Required')
})

const SearchResults = () => {
  const [results, setResults] = useState(null)

  return (
    <div>
      <h1>SearchResults Page</h1>

      <Formik
        initialValues={{
          query: ''
        }}
        validationSchema={SearchSchema}
        onSubmit={(values) => {
          service.searchSongs(values.query).then((response) => { setResults(response.hits) })
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Field name='query' />
            {(errors.query && touched.query) &&
              <div>{errors.query}</div>
            }

            <button type='submit' disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}>Search</button>
          </Form>
        )}
      </Formik>

      {results && (
        <ul>
          {results.map((hit, index) => {
            return <li key={index}>{hit.result.full_title}</li>
          })}
        </ul>
      )}
    </div>
  )
}

export default SearchResults
