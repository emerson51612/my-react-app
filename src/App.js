import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Home from './components/ManageRace/Home';
import Add from './components/ManageRace/Add';
import Edit from './components/ManageRace/Edit';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/" element={<Home />}/>
          <Route path ="/create" element={<Add />}/>
          <Route path ="/edit" element={<Edit />}/>
        </Routes>
      </Router>
     
    </div> 
  );
}

export default App;


