import type { CommandOrderOutSearchDto } from "../../types/command/CommandOrderOut";
import apiService from "../axiosInstance";
import type { SomsResponse } from "../somsResponse";



export const commandOrderOutApi = {
    searchOrders: async (printCn: string, orderType: string, customerName: string): Promise<SomsResponse<CommandOrderOutSearchDto[]>> => {
        const searchParam = {
            printCn: printCn || undefined,
            orderType: orderType || undefined,
            customerName: customerName || undefined,
        }
        const response = await apiService.get("/api/v1/command/order-out", searchParam);
        return response.data;
    },
    alignReleaseNum: async (nextReleaseNum: number, checkIds: number[]): Promise<SomsResponse<void>> => {
        const body = {
            nextReleaseNum: nextReleaseNum,
            orderIds: checkIds
        };
        const response = await apiService.put("/api/v1/command/order-out/release-num", body);
        return response.data;
    }
};