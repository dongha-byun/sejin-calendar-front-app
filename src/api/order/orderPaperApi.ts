
import type { OrderPaper } from "../../types/order/OrderPaper";
import apiService from "../axiosInstance"

export const orderPaperApi = {
    save: async (data: OrderPaper) => {
        await apiService.post("/api/v1/order/papers", data);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/order/papers");
        return response.data.data;
    }
}