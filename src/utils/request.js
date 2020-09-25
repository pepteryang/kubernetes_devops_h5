import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_URL,
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    // "Content-Type": "application/x-www-form-urlencoded",
    "Content-Type": "application/json;charset=UTF-8"
  }
});

// http request 拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = "JWT " + localStorage.getItem("token");
    }
    // do something before request is sent

    // if (store.getters.token) {
    //   // let each request carry token
    //   // ['X-Token'] is a custom headers key
    //   // please modify it according to the actual situation
    //   config.headers['X-Token'] = getToken()
    // }
    return config;
  },
  error => {
    // do something with request error
    return Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return response;
    }
  },
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("UserMenuList");
      location.herf = "/login";
      Message({
        message: error.message,
        type: "error",
        duration: 5 * 1000
      });
      return Promise.reject(error);
    } else if (error.response.status === 500) {
      return Promise.reject(error.response.data);
    }
    // 返回 response 里的错误信息
    return Promise.reject(error.response.data);
  }
);

export default service;
