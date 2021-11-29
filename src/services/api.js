import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_BASE_API
});

// Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('authorization')}`;
  return config;
});

export default instance;
