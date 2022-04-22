import service from '../services/users-service.js'

export const FIND_BY_USERNAME = 'FIND_BY_USERNAME'
export const LOGIN = 'LOGIN'
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT'
export const GRANT_CREATOR_ROLE = 'GRANT_CREATOR_ROLE'
export const GRANT_ADMIN_ROLE = 'GRANT_ADMIN_ROLE'

export const findByUsername = async (dispatch, username) => {
  const user = await service.findUserByUsername(username)
  dispatch({
    type: FIND_BY_USERNAME,
    user
  })
}

export const login = async (dispatch, username, password) => {
  const user = await service.login(username, password)
  dispatch({
    type: LOGIN,
    user
  })
}

export const createAccount = async (dispatch, username, password) => {
  const user = await service.createAccount(username, password)
  dispatch({
    type: CREATE_ACCOUNT,
    user
  })
}

export const grantCreatorRole = async (dispatch, username) => {
  await service.grantCreatorRole(username)
  dispatch({
    type: GRANT_CREATOR_ROLE,
    username
  })
}

export const grantAdminRole = async (dispatch, username) => {
  await service.grantAdminRole(username)
  dispatch({
    type: GRANT_ADMIN_ROLE,
    username
  })
}
