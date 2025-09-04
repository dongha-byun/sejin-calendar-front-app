import axios from "axios";
import { ACCESS_TOKEN_KEY } from "../context/AuthContext";

export const instance = axios.create({
    baseURL: "http://localhost:8085",
    timeout: 30000, // 30s
    headers: {
        'Content-Type': 'application/json',
    },
});

export const apiService = {
    get: async(url: string) => {
        return await instance.get(url);
    },
    post: async(url: string, body: any) => {
        return await instance.post(url, body).catch(error => {
            alert(error.result.message);
            throw error;
        });
    },
    delete: async(url: string) => {
        return await instance.delete(url);
    },
    put: async(url: string, body: any) => {
        return await instance.put(url, body);
    }
}

instance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

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
            // const originalRequest = error.config;
    
            // 여기서 리프래시 토큰으로 토큰 재발행 요청 처리
        }
        return Promise.reject(error.response?.data);
    },
);

export default apiService;