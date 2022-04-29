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
        if (error.response.status === 503) {
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
        <NavLink
          to='/'
          className='navbar-brand'
        >
          Parody Party
        </NavLink>

        <div className='w-100 d-flex justify-content-between' id='navbarColor01'>
          <SearchForm />
          <ul className='navbar-nav'>
            {user ? (
              <li className='nav-item'>
                <NavLink
                  to='/profile'
                  className={(navData) => cx('nav-link', navData.isActive ? 'active' : '')}
                >
                  {/* TODO: Make the text the user's display name */}
                  Profile
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
