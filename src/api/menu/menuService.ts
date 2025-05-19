import { axiosInstance } from "../axiosInstance";

export const menuService = {
    list: async () => {
        const response = await axiosInstance.get("/api/v1/menus");
        console.log("menuService:list ", response);
        return response.data;
    },
};