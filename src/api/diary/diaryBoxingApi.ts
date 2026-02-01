import type { DiaryBoxingOrderRequest } from "../../types/diary/DiaryBoxing";
import apiService from "../axiosInstance";

export const diaryBoxingApi = {
    searchOrder: async (orderNum: number) => {
        const response = await apiService.get(`/api/v1/diary/boxing/orders`, {
            orderNum: orderNum
        });
        return response.data;
    },
    saveBoxing: async (boxingOrders: DiaryBoxingOrderRequest[]) => {
        const body = {
            boxingOrders: boxingOrders
        };
        const response = await apiService.put(`/api/v1/diary/boxing/orders`, body);
        return response.data;
    }
}