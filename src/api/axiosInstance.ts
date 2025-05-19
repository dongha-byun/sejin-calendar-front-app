import axios from "axios"
import type { AxiosInstance } from "axios";
import { ACCESS_TOKEN_KEY } from "../context/AuthContext";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8888",
    timeout: 30000, // 30s
});
  
/** 인터셉터 설정 함수 */
const setupInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
      (config) => {
        const accessToken = localStorage.get(ACCESS_TOKEN_KEY);
  
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        console.log(config);
  
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
  );
  
  instance.interceptors.response.use(
      (response) => {
          return response;
      },
      async (error) => {
          /** 401 Authorization 에러 처리 (토큰 만료시) */
          if (error.response?.status === 401) {
              const originalRequest = error.config;
      
              // 여기서 리프래시 토큰으로 토큰 재발행 요청 처리
          }
          return Promise.reject(error.response?.data);
      },
  );
};

setupInterceptors(axiosInstance);

export { axiosInstance };