import { axiosInstance } from "../axiosInstance";

export const authService = {
    login: async (loginData: {loginId: string, password: string}) => {
        const response = await axiosInstance.post("/api/v1/login", loginData);
        console.log("authService:login ", response);
        return response.data;
    },
};