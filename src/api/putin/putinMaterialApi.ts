import apiService from "../axiosInstance"

export const putinMaterialApi = {
    save: async (data: any) => {
        await apiService.post("/api/v1/putin/materials", data);
    },
    list: async (bindMethod: string) => {
        const response = await apiService.get("/api/v1/putin/materials?bindMethod=" + bindMethod);
        return response.data.data;
    }
}