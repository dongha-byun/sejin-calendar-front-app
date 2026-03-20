import { apiService } from "../axiosInstance";
import type { MonitorModelSearchResponse } from "../../types/monitor/MonitorModelSearchResponse";

export const monitorModelApi = {
    search: async (modelNum: string): Promise<MonitorModelSearchResponse> => {
        const response = await apiService.get("/api/v1/monitor/models", { modelNum });
        return response.data.data;
    }
}