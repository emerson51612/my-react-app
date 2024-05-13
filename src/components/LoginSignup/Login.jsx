import React, { useState } from "react";
import axios, { BASE_URL } from "../../utility/Axios";
import { useNavigate } from "react-router-dom";
import "./LoginSignup.css";

import email_icon from "../assets/email.png";
import password_icon from "../assets/password.png";

const Login = ({ auth }) => {
  let history = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formDatas = new FormData(form);
    const formJson = Object.fromEntries(formDatas.entries());
    try {
      const resp = await axios.post(`${BASE_URL}/api/v1/account/login`, formJson);
      if (resp.data.error_code === 0) {
        setError("");
        auth.login(resp.data.data.access_token);
        history("/management");
      }
    } catch (err) {
      setError("Wrong email or password");
    }
  };

  const handleGoToSignup = () => {
    window.location.href = "/signup";
  };

  return (
    <div className="login_container">
      <div className="header">
        <div className="login_text">Login</div>
        <div className="underline"></div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login_inputs">
          <div className="input">
            <img src={email_icon} alt="" />
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div className="input">
            <img src={password_icon} alt="" />
            <input type="password" placeholder="Password" name="password" required />
          </div>
        </div>
        <div className="login_error">{error}</div>
        <div class="forgot_password">
          No account ?{" "}
          <span className="click_here" onClick={handleGoToSignup}>
            Sign up
          </span>
        </div>
        <div className="submit_container">
          <button className="submit" type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
