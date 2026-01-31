import apiService from "../axiosInstance";

export const diaryPrintCnApi = {
    searchOrder: async (printMethod: string, orderNum: number) => {
        const response = await apiService.get(`/api/v1/diary/print-cn/orders`, {
            printMethod: printMethod,
            orderNum: orderNum
        });
        return response.data;
    },
    completePrint: async (issueDate: string, orderIds: number[]) => {
        const response = await apiService.put(`/api/v1/diary/print-cn/complete`, {
            issueDate: issueDate,
            orderIds: orderIds
        });
        return response.data;
    }
}
