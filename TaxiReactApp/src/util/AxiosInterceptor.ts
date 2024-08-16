import  axios  from "axios";
import { getItemFromLocalStorage } from "./LocalStorage";

const axiosApiInstance = axios.create({
    baseURL: 'http://localhost:8352/api/Gateway',
})

axiosApiInstance.interceptors.request.use(
  (config) => {
    const token = getItemFromLocalStorage('accessToken');
    const exemptPaths = ['/users/register', '/users/login'];
    const isExemptPath = config.url && exemptPaths.some((path) => config.url!.includes(path));
    if (token && !isExemptPath) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
