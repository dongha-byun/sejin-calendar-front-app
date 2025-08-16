import { ACCESS_TOKEN_KEY } from "../../context/AuthContext";
import { apiService } from "../axiosInstance";

const authApi = {
     login: async (loginData: {loginId: string, password: string}) => {
        const response = await apiService.post("/api/v1/login", loginData);
        console.log("authService:login ", response);

        const data = response.data.data;

        if(data && data.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
        }
    },
};

export default authApi;
