import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // set your base URL here
  withCredentials: true, // send cookies (optional)
});

export default axiosInstance