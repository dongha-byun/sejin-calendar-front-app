import type { MonitorPrintStockResponse } from "../../types/monitor/MonitorPrintStockResponse";
import apiService from "../axiosInstance";

export interface MonitorPrintStockRequest {
    paperCompanyName?: string;
    printCompanyName?: string;
    weight?: string;
    properties?: string;
    standard?: string;
}

export const monitorPrintApi = {
    search: async (req?: MonitorPrintStockRequest): Promise<MonitorPrintStockResponse> => {
        const response = await apiService.get("/api/v1/monitors/papers/stocks/print-company", req);
        return response.data.data;
    }
};
