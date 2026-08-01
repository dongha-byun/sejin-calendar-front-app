import type { EtcSampleDto } from "../../types/etc/EtcSample";
import apiService from "../axiosInstance";

export const etcSampleApi = {
    save: async (data: EtcSampleDto) => {
        await apiService.post("/api/v1/order-manager/sample", data);
    },
    list: async (modelNum?: string) => {
        const response = await apiService.get("/api/v1/order-manager/sample", modelNum ? { modelNum } : undefined);
        return response.data.data;
    }
}
