import PropTypes from 'prop-types'

const parodyShape = PropTypes.shape({
  author: PropTypes.string,
  comments: PropTypes.array,
  date: PropTypes.date,
  likes: PropTypes.number,
  lyrics: PropTypes.string,
  originalGeniusID: PropTypes.number,
  title: PropTypes.string,
  _id: PropTypes.string
})

export default parodyShape
