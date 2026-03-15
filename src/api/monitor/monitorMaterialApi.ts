import type { MonitorMaterialSearchResponse } from "../../types/monitor/MonitorMaterialSearchResponse";
import type { MonitorMaterialSearchRequest } from "../../pages/monitor/material/components/MonitorMaterialFormSection";
import apiService from "../axiosInstance";

export const monitorMaterialApi = {
    search: async (req: MonitorMaterialSearchRequest): Promise<MonitorMaterialSearchResponse> => {
        const response = await apiService.get("/api/v1/monitor/materials", req);
        return response.data.data;
    }
}