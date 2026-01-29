import type { DiaryBind } from "../../types/diary/DiaryBind";
import apiService from "../axiosInstance";

export const diaryBindApi = {
    create : async (data: DiaryBind) => {
        await apiService.post("/api/v1/diary/binds", data);
    },
    list : async () => {
        const response = await apiService.get("/api/v1/diary/binds");
        return response.data.data;
    },
    getBindableQuantity: async (modelNum: string) => {
        const response = await apiService.post(`/api/v1/diary/binds/${modelNum}/bindable`, {});
        return response.data.data;
    }
}