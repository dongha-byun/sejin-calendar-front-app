import { apiService } from "../axiosInstance";

export const menuApi = {
    list: async () => {
        const response = await apiService.get("/api/v1/menus");
        console.log("menuService:list ", response);
        return response.data.data;
    },
};