import type { Material } from "../../types/baseinfo/Material";
import apiService from "../axiosInstance"

export const materialApi = {
    save: async (data: Material) => {
        await apiService.post("/api/v1/materials", data);
    },
    list: async (bindMethod?: string) => {
        let url = "/api/v1/materials";
        if(bindMethod) {
            url += `?bindMethod=${bindMethod}`;
        }
        const response = await apiService.get(url);
        return response.data.data;
    }
}