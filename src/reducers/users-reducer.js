import {
  FIND_BY_USERNAME,
  LOGIN,
  CREATE_ACCOUNT,
  GRANT_CREATOR_ROLE,
  GRANT_ADMIN_ROLE
} from '../actions/users-actions.js'

// State only bothers storing the currently logged in user
const usersReducer = (state = {}, action) => {
  switch (action.type) {
    case FIND_BY_USERNAME:
      return action.user
    case LOGIN:
      state = action.user
      return action.user
    case CREATE_ACCOUNT:
      state = action.user
      return action.user
    case GRANT_CREATOR_ROLE:
      if (action.username === state.username) {
        state.role = 'creator'
      }
      return state
    case GRANT_ADMIN_ROLE:
      if (action.username === state.username) {
        state.role = 'admin'
      }
      return state
    default:
      return state
  }
}

export default usersReducer
