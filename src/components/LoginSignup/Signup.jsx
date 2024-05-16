import React, { useState } from "react";
import axios, { BASE_URL } from "../../utility/Axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";
import user_icon from "../assets/person.png";

const Signup = () => {
  let history = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    if (formJson.confirm_password !== formJson.password) {
      setError("Passwords do not match");
      return;
    }
    delete formJson.confirm_password;
    try {
      const resp = await axios.post(
        `${BASE_URL}/api/v1/account/signup`,
        formJson
      );
      if (resp.data.error_code === 0) {
        setError("");
        handleGoToLogin();
      }
    } catch (err) {
      setError("Email existed or invalid inputs");
    }
  };

  const handleGoToLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="login_body">
      <div className="login_container">
        <div className="login_header">
          <div className="login_text">Signup</div>
          <div className="underline"></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="login_inputs">
            <div className="input">
              <img src={user_icon} alt="" />
              <input type="text" placeholder="Name" name="user_name" />
            </div>
            <div className="input">
              <img src={email_icon} alt="" />
              <input type="email" placeholder="Email" name="email" />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="input">
              <img src={password_icon} alt="" />
              <input
                type="password"
                placeholder=" Confirm Password"
                name="confirm_password"
              />
            </div>
          </div>
          <div className="login_error">{error}</div>
          <div class="forgot_password">
            Already have an account?
            <span className="click_here" onClick={handleGoToLogin}>
              Login
            </span>
          </div>
          <div className="submit_container">
            <button className="submit" type="submit">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
