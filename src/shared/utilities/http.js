import axios from 'axios';

const BASE_URL = 'https://64467a05ee791e1e2900454d.mockapi.io/api';

const axiosInstance = axios.create({
  baseURL: BASE_URL
});

export default axiosInstance;
