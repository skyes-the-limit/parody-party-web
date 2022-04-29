import React from 'react'
import { Field, Form, Formik } from 'formik'
import * as Yup from 'yup'

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
[X] Must provide a link/button to navigate to the details page (see below)
[X] Must be mapped to /search when no search has been executed and no results exist
[X] Must be mapped to /search/{search criteria} or /search?criteria={search criteria} when a search has been executed
    and according results shown
[X] Can augment the results with related data in your local databases
[X] The search and results page can be implemented as either a single page or separate pages. In that case a separate
    route can be used such as /results/{search criteria} or /results?criteria={search criteria}
*/

const SearchSchema = Yup.object().shape({
  query: Yup.string()
    .required('Required')
})

const SearchForm = () => {
  return (
    <Formik
      initialValues={{
        query: ''
      }}
      validationSchema={SearchSchema}
      onSubmit={(values) => {
        location.href = `${location.origin}/search/${values.query}`
      }}
    >
      {({ errors, touched }) => (
        <Form className='d-flex me-auto'>
          <Field name='query' className='form-control me-sm-2' />

          <button
            type='submit'
            disabled={!Object.keys(errors).length === 0 && Object.keys(touched).length === 0}
            className='btn btn-secondary my-2 my-sm-0'
          >
            Search
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default SearchForm
