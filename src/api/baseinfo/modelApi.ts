import type { Model } from "../../types/baseinfo/Model";
import apiService from "../axiosInstance"

export const modelApi = {
    save: async (data: Model) => {
        await apiService.post("/api/v1/models", data);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/models");
        return response.data.data;
    }
}