import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import LoginSignup from './components/LoginSignup/LoginSignup';


function App() {
  return (
    <div>
      <LoginSignup/>
    </div> 
  );
}

export default App;


