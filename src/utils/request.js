import axios from 'axios';

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    withCredentials: true ,// 允许携带cookie
    baseURL: 'http://47.94.106.106:8000/',
    // baseURL: 'http://192.168.1.181:8000/',
    timeout: 5000,
    /*proxy: {
      host: '127.0.0.1',
      port: 9000,
      auth: {
        username: 'mikeymike',
        password: 'rapunz3l'
      }
    },*/
});

service.interceptors.request.use(
    config => {
      //localStorage中获取token
      if(localStorage.getItem("ms_userInfo")){
        let token = JSON.parse(localStorage.getItem("ms_userInfo")).data.token;
        console.log(token)
        if(token !== null){
          config.headers = {
            'Authorization': 'JWT ' +token
          }
        }
      }
      return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200 || response.status === 201) {
            return response;
        } else {
          Promise.reject();
        }
    },
    error => {
      console.log(error.response.status)
        return Promise.reject(error);
    }
);

export default service;
