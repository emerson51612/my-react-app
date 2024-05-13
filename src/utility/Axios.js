import axios from "axios";
import get from "lodash/get";

export const BASE_URL = process.env.REACT_APP_API_URL;
const _axios = axios.create({})

_axios.interceptors.request.use(
    async (cfg) => {
			let token = localStorage.getItem("token");
      if (token) {
        cfg.headers["Authorization"] = `Bearer ${token}`;
      }
      return cfg;
    },
    (err) => {
      // Do something with request error
      return Promise.reject(err);
    }
  );
  
  // Add a response interceptor
  _axios.interceptors.response.use(
    (res) => {
      // Do something with response data
      return res;
    },
    async (err) => {
      // Do something with response error
      const status = get(err, "response.status");
      if ([401, 403].includes(status)) {
        localStorage.removeItem('token');
      }
      return Promise.reject(err);
    }
  );

export default _axios;