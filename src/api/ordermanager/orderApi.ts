import { toOrderCreateRequest, toOrderDto, type OrderCreateRequestDto } from "../../types/ordermanager/Order";
import apiService from "../axiosInstance";

export const orderApi = {
    save: async(data: OrderCreateRequestDto) => {
        const pureData = toOrderCreateRequest(data);
        await apiService.post("/api/v1/order-manager/accept", pureData);
    },
    list: async() => {
        const response = await apiService.get("/api/v1/order-manager/accept");
        const list = response.data.data;
        return list.map(toOrderDto);
    },
    nextOrderNum: async() => {
        const response = await apiService.get("/api/v1/order-manager/next-order-num");
        return response.data.data;
    },
    nextReleaseNum: async() => {
        const response = await apiService.get("/api/v1/order-manager/next-release-num");
        return response.data.data;
    },
    searchOrderCancelList: async(customerName?: string, modelNum?: string) => {
        let endpoint = "/api/v1/order/cancel/search";
        const param = {
            customerName: customerName || undefined,
            modelNum: modelNum || undefined,
        };

        const response = await apiService.get(endpoint, param);
        return response.data.data;
    }
}