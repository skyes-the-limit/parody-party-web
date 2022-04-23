import React from 'react'

/*
The details page allow users to view a details view of the search result. They can see more information when they click
on the search result. The details page must fulfill the following requirements.
[ ] Must retrieve details from the remote API based on some unique identifier provided as a parameter from the
    search/results page
[ ] Must display additional related data from the local database. For instance, if you are displaying the details of a
    movie, some other folks might have reviewed the movie. All reviews related to the movie must be shown in all or
    partial form
[ ] Must provide links to related data/users. For instance, if you are displaying the details of a movie, and below you
    are displaying a list of reviews for that movie, provide links to the profile pages of folks who wrote the reviews
    for the movie
[ ] Must be mapped to /details/{unique identifier} or /details?identifier={unique identifier} where unique identifier
    uniquely identies the item being displayed

*/

const Parody = () => {
  return (
    <h1>Parody Page</h1>
  )
}

export default Parody
