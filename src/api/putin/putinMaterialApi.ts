import { toPutinMaterialDto, toPutinMaterialType, type PutinMaterialDto } from "../../types/putin/PutinMaterial";
import apiService from "../axiosInstance"

export const putinMaterialApi = {
    save: async (data: PutinMaterialDto) => {
        const pureData = toPutinMaterialType(data);
        await apiService.post("/api/v1/putin/materials", pureData);
    },
    list: async (bindMethod: string) => {
        const response = await apiService.get("/api/v1/putin/materials?bindMethod=" + bindMethod);
        const result = response.data.data;
        return result.map(toPutinMaterialDto);
    }
}