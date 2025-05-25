import { ACCESS_TOKEN_KEY } from "../../context/AuthContext";
import axiosInstance from "../axiosInstance";

export const authService = {
    login: async (loginData: {loginId: string, password: string}) => {
        console.log(loginData);
        console.log(axiosInstance);
        try{
            const response = await axiosInstance.post("/api/v1/login", loginData);
            console.log("authService:login ", response);

            const data = response.data;

            if(data && data.accessToken) {
                localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
            }
        } catch (error) {
            console.error(error);
        }
        
    },
};
