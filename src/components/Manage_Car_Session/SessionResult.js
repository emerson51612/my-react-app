import React, { useEffect, useRef, useState } from "react";
import _axios, { BASE_URL } from "../../utility/Axios";

const SessionResult = ({ setTitle }) => {
  useEffect(() => {
    setTitle("Session View");
  }, []);
};

export default SessionResult;
