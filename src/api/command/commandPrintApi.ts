
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
    }
}