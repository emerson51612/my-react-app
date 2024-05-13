import React, { useContext, createContext, useState } from "react";
import {
  Route,
  Navigate,
} from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function useAuth() {
  return useContext(authContext);
}

export function useProvideAuth() {
  const [token, setToken] = useState('');
  const [decodedToken, setDecodedToken] = useState('');
  const isAuthenticated = () => {
    let local_token = localStorage.getItem("token");
    if (!local_token) {
      return false;
    }
    let exp = decodedToken?.exp;
    if (!exp) {
      let trial_token = decodeToken(local_token);
      exp = trial_token?.exp;
      if (!exp) {
        return false;
      }
    }
    return moment.unix(exp).isAfter();
  };

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };
  
  const login = (token) => {
    if (!token) return;
    setToken(token);
    setDecodedToken(decodeToken(token));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setDecodedToken(null);
    localStorage.removeItem("token");
  };

  return {
    token,
    isAuthenticated,
    login,
    logout,
  };
}

export function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={() =>
        auth.isAuthenticated() ? (
          children
        ) : (
          <Navigate
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}
