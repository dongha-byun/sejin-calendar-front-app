
import { toCommandPaperDeliveryDto, toCommandPaperDeliveryType, type CommandPaperDeliveryDto } from "../../types/command/CommandPaperDelivery";
import apiService from "../axiosInstance"

export const commandPaperDeliveryApi = {
    save: async (data: CommandPaperDeliveryDto) => {
        const pureData = toCommandPaperDeliveryType(data);
        await apiService.post("/api/v1/command/paper-delivery", pureData);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/command/paper-delivery");
        const result = response.data.data;
        return result.map(toCommandPaperDeliveryDto);
    }
}