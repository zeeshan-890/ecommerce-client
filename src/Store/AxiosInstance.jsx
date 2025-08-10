import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ecommerce-zeeshan-135137aebf89.herokuapp.com/', // set your base URL here
  withCredentials: true, // send cookies (optional)
});

export default axiosInstance
