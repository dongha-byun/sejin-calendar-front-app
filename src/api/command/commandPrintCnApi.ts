import type { CommandPrintCnSearchDto } from "../../types/command/CommandPrintCn";
import apiService from "../axiosInstance";
import type { SomsResponse } from "../somsResponse";

export const commandPrintCnApi = {
    searchOrder: async (orderNum: number) : Promise<SomsResponse<CommandPrintCnSearchDto>> => {
        const response = await apiService.get(`/api/v1/command/print-cn/orders/${orderNum}`);
        return response.data;
    },
    
    printPrepare: async (printMethod: string, orderNums: number[]) => {
        const body = {
            printMethod: printMethod,
            orderNums: orderNums
        }
        await apiService.post("/api/v1/command/print-cn/print/prepare", body);
    }
}