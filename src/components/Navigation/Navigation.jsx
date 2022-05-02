import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

import authService from '../../services/auth-service'
import SearchForm from '../Search/SearchForm'

const Navigation = () => {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    if (user === undefined) {
      authService.profile().then(response => {
        setUser(response)
      }).catch((error) => {
        // TODO: Caught "error" HTTP status still logs to console
        if (error.response.status === 403) {
          setUser(null)
        } else {
          throw error
        }
      })
    }
  }, [user])

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <div className='w-100 d-flex justify-content-between align-items-center' id='navbarColor01'>
          <div className='d-flex align-items-center'>
            <NavLink
              to='/'
              className='navbar-brand'
            >
              Parody Party
            </NavLink>
            <SearchForm />
          </div>

          <ul className='navbar-nav d-flex'>
            {user ? (
              <li className='nav-item'>
                <NavLink
                  to='/profile'
                  className={(navData) => cx('nav-link', navData.isActive ? 'active' : '')}
                >
                  {user.displayName || user.username}
                </NavLink>
              </li>
            ) : (
              <li className='nav-item'>
                <NavLink
                  to='/login'
                  className={(navData) => cx('nav-link', navData.isActive ? 'active' : '')}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
