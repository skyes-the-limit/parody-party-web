import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

import service from '../../services/search-service.js'

/*
The website should provide users the capability to search content from a remote service and display a summary of the
results. Search and results can be in the same page or in separate pages. Maybe the search bar can be in the home page,
and the results in a separate page. Or both in a separate search page. The results could be formatted in a list, or a
grid, or a table. They can have a short description, and a thumbnail of the result. For instance, if you chose movies
as your domain objects, then users must be able to search for movies. Users must be able to see a summary of the search
results and navigate to a detail page that shows a detail view of the result. The search and results page must fulfill
the following requirements.

[X] Must provide a form to search a remote API, not your own API
[X] Must provide a summarized list of results matching the search criteria. Results must come from the remote API, not
    your local database
[ ] Must provide a link/button to navigate to the details page (see below)
[ ] Must be mapped to /search when no search has been executed and no results exist
[ ] Must be mapped to /search/{search criteria} or /search?criteria={search criteria} when a search has been executed
    and according results shown
[ ] Can augment the results with related data in your local databases
[ ] The search and results page can be implemented as either a single page or separate pages. In that case a separate
    route can be used such as /results/{search criteria} or /results?criteria={search criteria}
*/

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

            <button
              type='submit'
              disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}>
              Search
            </button>
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
