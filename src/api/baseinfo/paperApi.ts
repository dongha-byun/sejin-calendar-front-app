import type { Paper } from "../../types/baseinfo/Paper";
import apiService from "../axiosInstance"

export const paperApi = {
    save: async (data: Paper) => {
        await apiService.post("/api/v1/papers", data);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/papers");
        return response.data.data;
    }
}