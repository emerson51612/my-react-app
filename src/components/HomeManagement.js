import React, { useEffect, useState, useRef } from "react";
import _axios, { BASE_URL } from "../utility/Axios";
import { Outlet, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import logout_icon from "./assets/logout.webp";
import person from "./assets/person.png";
import "./home.css";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

function Home({ auth, title }) {
  const logout = () => {
    auth.logout();
  };
  useEffect(() => {
    if (!auth.isAuthenticated()) {
      auth.logout();
      window.location.href = "/login";
    } else {
      getUserDetails();
    }
  }, [localStorage.getItem("token")]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(path);
    handleClose();
  };
  const [userDetails, setUserDetails] = useState({});
  const getUserDetails = async () => {
    try {
      const response = await _axios.get(`${BASE_URL}/api/v1/account/user`, {
        withCredentials: true,
      });
      setUserDetails(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [showLogOut, setShowLogOut] = useState(false);
  const target = useRef(null);
  return (
    <div className="Home">
      <div className="navbar">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="menu_item">
              <i className="fa-solid fa-book" style={{ fontSize: "1.5em" }}></i>
              <div
                className="txt"
                style={{ fontSize: "1.5em", color: "black" }}
                onClick={() => handleClick("/management/library")}
              >
                Manage Library
              </div>
            </div>
            <div className="menu_item">
              <i className="fa-solid fa-car" style={{ fontSize: "1.5em" }}></i>
              <div
                className="txt"
                style={{ fontSize: "1.5em", color: "black" }}
                onClick={() => handleClick("/management/race")}
              >
                Manage Car Race
              </div>
            </div>
            <div className="menu_item">
              <i
                className="fa-solid fa-hourglass-half"
                style={{ fontSize: "1.5em" }}
              />
              <div
                className="txt"
                style={{ fontSize: "1.5em", color: "black" }}
                onClick={() => handleClick("/management/session")}
              >
                Manage Session
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
        <div className="menu-icon" onClick={handleShow}>
          ☰
        </div>
        <div className="title">{title}</div>
        <div className="user-details">
          <img className="account_icon" src={person} alt="" />
          <div className="user-name">{userDetails.user_name}</div>
          <img
            className="logout_icon"
            src={logout_icon}
            alt=""
            onClick={logout}
          />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
