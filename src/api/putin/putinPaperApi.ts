import { toPutinPaperDto, toPutinPaperType, type PutinPaperDto } from "../../types/putin/PutinPaper";
import apiService from "../axiosInstance"

export const putinPaperApi = {
    save: async (data: PutinPaperDto) => {
        const pureData = toPutinPaperType(data);
        await apiService.post("/api/v1/putin/papers", pureData);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/putin/papers");
        const result = response.data.data;
        return result.map(toPutinPaperDto);
    }
};