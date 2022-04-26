import React from 'react'
import { NavLink } from 'react-router-dom'
import cx from 'classnames'

const Navigation = () => {
  const loggedIn = false // TODO
  // <>
  //   <Link to='/' className='d-block'>Home</Link>
  //   <Link to='/login' className='d-block'>Login</Link>
  //   <Link to='/profile' className='d-block'>Profile</Link>
  //   <Link to='/search' className='d-block'>Search</Link>
  // </>

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container-fluid'>
        <a className='navbar-brand' href='#'>Parody Party</a>

        <div className='w-100 d-flex justify-content-between' id='navbarColor01'>
          <form className='d-flex me-auto'>
            <input className='form-control me-sm-2' type='text' placeholder='Search'></input>
            <button className='btn btn-secondary my-2 my-sm-0' type='submit'>Search</button>
          </form>

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
