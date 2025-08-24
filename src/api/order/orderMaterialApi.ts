
import type { OrderMaterial } from "../../types/order/OrderMaterial";
import apiService from "../axiosInstance"

export const orderMaterialApi = {
    save: async (data: OrderMaterial) => {
        await apiService.post("/api/v1/order/materials", data);
    },
    list: async (bindMethod: string) => {
        const response = await apiService.get("/api/v1/order/materials?bindMethod=" + bindMethod);
        return response.data.data;
    }
}