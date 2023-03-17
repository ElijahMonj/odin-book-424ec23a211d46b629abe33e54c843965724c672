
import './App.css';
import {BrowserRouter, Route,Routes} from 'react-router-dom';
import React from 'react';

import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Profile from './components/Profile'
import Myprofile from './components/Myprofile'
import Chat from './components/Chat'
import Post from './components/Post'
import Search from './components/Search'
import Signup from './components/Signup'
import Settings from './components/Settings';
import {Link, NavLink} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div className="App container-fluid h-100" style={{padding:0}}>
      
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/myprofile' element={<Myprofile/>}/>
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/settings' element={<Settings/>}/>
        </Routes>
      </div>
      
      </BrowserRouter>
  );
}

export default App;
