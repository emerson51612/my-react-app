import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Offcanvas from "react-bootstrap/Offcanvas";
import logout_icon from "./assets/logout.webp";
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
        <img
          className="logout_icon"
          src={logout_icon}
          alt=""
          onClick={logout}
        />
      </div>
      <Outlet />
    </div>
  );
}

export default Home;
