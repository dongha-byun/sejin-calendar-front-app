import type { EtcRevenueQuery, EtcRevenueRow, EtcRevenueSummaryData } from "../../types/etc/EtcRevenue";
import apiService from "../axiosInstance";

const toParams = (query: EtcRevenueQuery) => ({
    startDate: query.startDate,
    endDate: query.endDate,
    modelNum: query.modelNum ?? '',
    customerName: query.customerName ?? '',
    printCnType: query.printCnType,
    printCnKeyword: query.printCnKeyword ?? '',
});

export const etcRevenueApi = {
    list: async (query: EtcRevenueQuery): Promise<EtcRevenueRow[]> => {
        const response = await apiService.get("/api/v1/etc/revenue", toParams(query));
        return response.data.data;
    },
    summary: async (query: EtcRevenueQuery): Promise<EtcRevenueSummaryData> => {
        const response = await apiService.get("/api/v1/etc/revenue/summary", toParams(query));
        return response.data.data;
    },
};
