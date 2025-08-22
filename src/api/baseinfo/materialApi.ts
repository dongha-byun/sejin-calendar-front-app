import type { Material } from "../../types/baseinfo/Material";
import apiService from "../axiosInstance"

export const materialApi = {
    save: async (data: Material) => {
        await apiService.post("/api/v1/materials", data);
    },
    list: async (bindMethod: string) => {
        const response = await apiService.get("/api/v1/materials?bindMethod=" + bindMethod);
        return response.data.data;
    }
}