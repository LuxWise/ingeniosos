import axios from 'axios';
import { URL } from './constans/constans';

const axiosInstance = axios.create({
  baseURL: `${URL}`,
  withCredentials: true,
});

export default axiosInstance