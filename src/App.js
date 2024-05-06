import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Home_Lib from './components/Manage_Lib/Home_Lib';
import Edit_Lib from './components/Manage_Lib/Edit_Lib'
import Home_Lib_Sess from './components/Manage_Car_Session/Home_Lib_Sess';
import Home_Lib_Car from './components/Manage_Car_Race/Home_Lib_Car';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path ="/loginsignup" element={<LoginSignup/>}/>
          <Route path ="/library" element={<Home_Lib/>}/>
          <Route path ="/library/edit" element={<Edit_Lib/>}/>
          <Route path ="/library_sess" element={<Home_Lib_Sess/>}/>
          <Route path ="/library_car" element={<Home_Lib_Car/>}/>
          <Route path ="/login" element={<LoginSignup/>}/>
        </Routes>
      </Router>
     
    </div> 
  );
}

export default App;


