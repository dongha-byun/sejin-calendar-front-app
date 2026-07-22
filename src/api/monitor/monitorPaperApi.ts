import type { MonitorPaperStockResponse } from "../../types/monitor/MonitorPaperStockResponse";
import apiService from "../axiosInstance";

export interface MonitorPaperStockRequest {
    paperCompanyName?: string;
    printCompanyName?: string;
}

export const monitorPaperApi = {
    search: async (req?: MonitorPaperStockRequest): Promise<MonitorPaperStockResponse> => {
        const response = await apiService.get("/api/v1/monitors/papers/stocks/paper", req);
        return response.data.data;
    }
};
