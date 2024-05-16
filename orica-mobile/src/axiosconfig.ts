// axiosConfig.js
import axios from "axios";
import { URL } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const instance = axios.create({
  baseURL: `${URL}`,
});

instance.interceptors.request.use(
  async config => {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.log("Error al obtener el token:", error);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
