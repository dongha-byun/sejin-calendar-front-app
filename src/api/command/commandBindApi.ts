
import { toCommandBindDto, toCommandBindType, type CommandBindDto } from "../../types/command/CommandBind";
import apiService from "../axiosInstance"

export const commandBindApi = {
    save: async (data: CommandBindDto) => {
        const pureData = toCommandBindType(data);
        await apiService.post("/api/v1/command/bind", pureData);
    },
    list: async () => {
        const response = await apiService.get("/api/v1/command/bind");
        const result = response.data.data;
        return result.map(toCommandBindDto);
    }
}