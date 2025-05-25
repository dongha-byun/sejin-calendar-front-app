import type { MenuItem } from "../../types/menu/MenuItem";
import axiosInstance from "../axiosInstance";

export const menuService = {
    list: async (): Promise<MenuItem[]> => {
        const response = await axiosInstance.get<MenuItem[]>("/api/v1/menus");
        console.log("menuService:list ", response);
        return response.data;
    },
};