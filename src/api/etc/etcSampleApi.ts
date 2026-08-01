import type { EtcSampleDto } from "../../types/etc/EtcSample";
import apiService from "../axiosInstance";

export const etcSampleApi = {
    save: async (data: EtcSampleDto) => {
        await apiService.post("/api/v1/order-manager/sample", data);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/order-manager/sample");
        return response.data.data;
    }
}
