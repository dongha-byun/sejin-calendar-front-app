
import { toCommandPrintDto, toCommandPrintType, type CommandPrintDto } from "../../types/command/CommandPrint";
import apiService from "../axiosInstance"

export const commandPrintApi = {
    save: async (data: CommandPrintDto) => {
        const pureData = toCommandPrintType(data);
        await apiService.post("/api/v1/command/print", pureData);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/command/print");
        const result = response.data.data;
        return result.map(toCommandPrintDto);
    },
    search: async (companyName?: string, modelNum?: string) => {
        const queryParam = {
            printCompanyName: companyName || undefined,
            modelNum: modelNum || undefined,
        }
        const response = await apiService.get("/api/v1/command/print/search", queryParam);
        return response.data.data;
    },
}