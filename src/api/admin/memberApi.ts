import type { AdminMember } from "../../types/admin/AdminMember";
import apiService from "../axiosInstance";

export const memberApi = {
    selectOne: async (userId: string) => {
        const response = await apiService.get(`/api/v1/members/${userId}`);
        return response.data.data;
    },
    save: async (data: AdminMember) => {
        await apiService.post("/api/v1/members", data);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/members");
        return response.data.data;
    },
    delete: async (userId: string) => {
        await apiService.delete(`/api/v1/members/${userId}`);
    }
}