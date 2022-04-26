import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'
import SearchForm from '../Search/SearchForm'

const Navigation = () => {
  const loggedIn = false // TODO

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
            {loggedIn ? (
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
