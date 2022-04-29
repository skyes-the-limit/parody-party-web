import PropTypes from 'prop-types'

const userShape = PropTypes.shape({
  _id: PropTypes.string,
  username: PropTypes.string,
  displayName: PropTypes.string,
  role: PropTypes.oneOf(['user', 'creator', 'admin']),
  requestedVerification: PropTypes.bool
})

export default userShape
