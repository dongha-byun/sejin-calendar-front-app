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
    }
}