import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import MySideNav from './components/MySideNav';
import LoginSignup from './components/LoginSignup/LoginSignup';
import Home_Lib from './components/Manage_Lib/Home_Lib';
import Edit_Lib from './components/Manage_Lib/Edit_Lib';
import Add_Lib from './components/Manage_Lib/Add_Lib'
import Home_Lib_Sess from './components/Manage_Car_Session/Home_Lib_Sess';
import Edit_Lib_Sess from './components/Manage_Car_Session/Edit_Lib_Sess';
import Add_Lib_Sess from './components/Manage_Car_Session/Add_Lib_Sess';
import Home_Lib_Car from './components/Manage_Car_Race/Home_Lib_Car';
import Edit_Lib_Car from './components/Manage_Car_Race/Edit_Lib_Car';
import Add_Lib_Car from './components/Manage_Car_Race/Add_Lib_Car';
import Video from './components/video/video';



function App() {
  return ( 
    <div className="App">
    <Router>
      <MySideNav />
          <Routes>
          <Route path ="/loginsignup" element={<LoginSignup/>}/>
          <Route path ="/library" element={<Home_Lib/>}/>
          <Route path ="/library/edit" element={<Edit_Lib/>}/>
          <Route path ="/library/add" element={<Add_Lib/>}/>
          <Route path ="/library_sess" element={<Home_Lib_Sess/>}/>
          <Route path ="/library_sess/edit" element={<Edit_Lib_Sess/>}/>
          <Route path ="/library_sess/add" element={<Add_Lib_Sess/>}/>
          <Route path ="/library_car" element={<Home_Lib_Car/>}/>
          <Route path ="/library_car/edit" element={<Edit_Lib_Car/>}/>
          <Route path ="/library_car/add" element={<Add_Lib_Car/>}/>
          <Route path ="/video/video" element={<Video/>}/>
        </Routes>
    </Router>
      </div>
      
     
    
  );
}

export default App;


