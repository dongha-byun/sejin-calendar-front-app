import { toOrderCreateRequest, type OrderCreateRequestDto } from "../../types/ordermanager/Order";
import apiService from "../axiosInstance";

export const orderApi = {
    save: async(data: OrderCreateRequestDto) => {
        const pureData = toOrderCreateRequest(data);
        await apiService.post("/api/v1/order-manager/accept", pureData);
    },
    list: async() => {
        const response = await apiService.get("/api/v1/order-manager/accept");
        return response.data.data;
    }
}