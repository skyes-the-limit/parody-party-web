import PropTypes from 'prop-types'

const userShape = PropTypes.shape({
  username: PropTypes.string,
  displayName: PropTypes.string,
  role: PropTypes.oneOf(['user', 'creator', 'admin'])
})

export default userShape
