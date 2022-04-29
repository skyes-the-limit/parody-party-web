import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import PARODY_MODE from './definitions/parody-mode.js'

import Navigation from './components/Navigation/Navigation'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import Parody from './components/Parody/Parody'
import Profile from './components/Profile/Profile'
import SearchResults from './components/Search/SearchResults'

import 'bootswatch/dist/sandstone/bootstrap.min.css'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className='container'>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='details/:originalId' element={<Parody initialMode={PARODY_MODE.CREATE} />} />
            <Route path='details/:originalId/:parodyId' element={<Parody initialMode={PARODY_MODE.VIEW} />} />
            <Route path='profile' element={<Profile />} />
            <Route path='profile/:username' element={<Profile />} />
            <Route path='search/:query' element={<SearchResults />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
