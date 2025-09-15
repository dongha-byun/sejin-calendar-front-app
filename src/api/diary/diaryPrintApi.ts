
import apiService from "../axiosInstance"

export const diaryPrintApi = {
    create: async(ids: number[]) => {
        const body = {
            commandPrintIds: ids
        };

        await apiService.post("/api/v1/diary/print", body);
    }
}