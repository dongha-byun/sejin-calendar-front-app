
import type { CombinableQuantityResponse, DiaryMachine } from "../../types/diary/DiaryMachine";
import apiService from "../axiosInstance"

export const diaryMachineApi = {
    create: async(body: DiaryMachine) => {
        await apiService.post("/api/v1/diary/machines", body);
    },
    list: async() : Promise<DiaryMachine[]> => {
        const response = await apiService.get("/api/v1/diary/machines");
        return response.data.data;
    },
    getCombinableQuantity: async(modelNum: string) : Promise<CombinableQuantityResponse> => {
        const response = await apiService.get(`/api/v1/diary/machines/${modelNum}/combinable`);
        return response.data.data;
    }
}