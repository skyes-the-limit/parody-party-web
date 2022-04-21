import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Parody from './components/Parody/Parody'
import Profile from './components/Profile/Profile'
import SearchResults from './components/SearchResults/SearchResults'

import './App.css'

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

function App () {
  return (
    <BrowserRouter>
      <div className="container">
        <Navigation />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="details" element={<Parody />} />
            <Route path="profile" element={<Profile />} />
            <Route path="search" element={<SearchResults />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
