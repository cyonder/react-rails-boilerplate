import axios from 'axios';
import { ROOT_API_URL } from './configurations';

export const axiosInstance = axios.create({
  baseURL: ROOT_API_URL,
  timeout: 1000
});
