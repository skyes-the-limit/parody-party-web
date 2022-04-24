import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'

import usersReducer from './reducers/users-reducer'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Parody from './components/Parody/Parody'
import Profile from './components/Profile/Profile'
import Search from './components/Search/Search'
import SearchResults from './components/Search/SearchResults'

import './App.css'

const reducer = combineReducers({
  user: usersReducer
})

const store = createStore(reducer)

const Navigation = () => {
  return (
    <>
      <Link to='/' className='d-block'>Home</Link>
      <Link to='/login' className='d-block'>Login</Link>
      <Link to='/details' className='d-block'>Parody</Link>
      <Link to='/profile' className='d-block'>Profile</Link>
      <Link to='/search' className='d-block'>Search</Link>
    </>
  )
}

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className='container'>
          <Navigation />
          <Routes>
            <Route path='/'>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='details' element={<Parody mode={'CREATE'} />} />
              <Route path='details/:originalId/:parodyId' element={<Parody mode={'VIEW'} />} />
              {/* Yes, this really is the recommended way to have optional parameters:
              https://github.com/remix-run/react-router/issues/7285 */}
              <Route path='profile' element={<Profile />} />
              <Route path='profile/:username' element={<Profile />} />
              <Route path='search' element={<Search />} />
              <Route path='search/:query' element={<SearchResults />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  )
}

export default App
