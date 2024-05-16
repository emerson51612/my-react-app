import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import 'react-toastify/dist/ReactToastify.css';
import { ProvideAuth, useProvideAuth } from "./utility/Authentication";
import { ToastContainer } from "react-toastify";
import NotFound from "./components/404NotFound";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import Home from "./components/HomeManagement";
import Home_Lib from "./components/Manage_Lib/Home_Lib";
import Edit_Lib from "./components/Manage_Lib/Edit_Lib";
import Add_Lib from "./components/Manage_Lib/Add_Lib";
import Home_Lib_Sess from "./components/Manage_Car_Session/Home_Lib_Sess";
import Add_Lib_Sess from "./components/Manage_Car_Session/Add_Lib_Sess";
import Home_Lib_Car from "./components/Manage_Car_Race/Home_Lib_Car";
import Edit_Lib_Car from "./components/Manage_Car_Race/Edit_Lib_Car";
import Add_Lib_Car from "./components/Manage_Car_Race/Add_Lib_Car";
import SessionForGuest from "./components/car_race_question_popup/SessionForGuest";
import SessionResult from "./components/car_race_question_popup/SessionResult";

function App() {
  let auth = useProvideAuth();
  let token = localStorage.getItem("token");
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (token) {
      auth.login(token);
    } else {
      auth.logout();
    }
  }, []);
  return (
    <div className="App">
      <ProvideAuth>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login auth={auth} />} />
            <Route path="/login" element={<Login auth={auth} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/session/:id" element={<SessionForGuest />} />
            <Route
              path="/management"
              element={<Home auth={auth} title={title} />}
            >
              <Route
                path="library"
                element={<Home_Lib setTitle={setTitle} />}
              />
              <Route
                path="library/edit/:id"
                element={<Edit_Lib setTitle={setTitle} />}
              />
              <Route
                path="library/add"
                element={<Add_Lib setTitle={setTitle} />}
              />
              <Route
                path="session"
                element={<Home_Lib_Sess setTitle={setTitle} />}
              />
              <Route
                path="session/add"
                element={<Add_Lib_Sess setTitle={setTitle} />}
              />
              <Route
                path="session/:id"
                element={<SessionResult setTitle={setTitle}/>}
              />
              <Route
                path="race"
                element={<Home_Lib_Car setTitle={setTitle} />}
              />
              <Route
                path="race/edit/:id"
                element={<Edit_Lib_Car setTitle={setTitle} />}
              />
              <Route
                path="race/add"
                element={<Add_Lib_Car setTitle={setTitle} />}
              />
              <Route path="" element={<Home_Lib setTitle={setTitle} />} />
            </Route>
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </Router>
        <ToastContainer />
      </ProvideAuth>
    </div>
  );
}

export default App;
