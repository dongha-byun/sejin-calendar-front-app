import apiService from "../axiosInstance";
import type {
    MonitorOrderApiRow,
    MonitorOrdersResponseData,
    MonitorOrdersStatisticData,
    MonitorPrintCnType,
} from "../../types/monitor/MonitorOrder";

export interface MonitorOrdersQuery {
    modelNum: string;
    customerName?: string;
    printCnType: MonitorPrintCnType;
    printCnKeyword: string;
}

export interface MonitorOrdersResult {
    orderList: MonitorOrderApiRow[];
    raw: MonitorOrdersResponseData;
}

const monitorOrdersQueryParams = (query: MonitorOrdersQuery) => ({
    modelNum: query.modelNum,
    customerName: query.customerName ?? "",
    printCnType: query.printCnType,
    printCnKeyword: query.printCnKeyword ?? "",
});

export const monitorOrderApi = {
    list: async (query: MonitorOrdersQuery): Promise<MonitorOrdersResult> => {
        const response = await apiService.get("/api/v1/monitor/orders", monitorOrdersQueryParams(query));
        const data = response.data.data as MonitorOrdersResponseData;
        return {
            orderList: data.orderList,
            raw: data,
        };
    },

    statistic: async (query: MonitorOrdersQuery): Promise<MonitorOrdersStatisticData> => {
        const response = await apiService.get(
            "/api/v1/monitor/orders/statistic",
            monitorOrdersQueryParams(query),
        );
        return response.data.data as MonitorOrdersStatisticData;
    },
};
