import type { CustomCompany } from "../../types/baseinfo/CustomCompany";
import apiService from "../axiosInstance"

export const customCompanyApi = {
    save: async (data: CustomCompany) => {
        await apiService.post("/api/v1/custom-company", data);
    },
    list: async (companyType: string) => {
        const response = await apiService.get("/api/v1/custom-company?companyType=" + companyType);
        console.log("customCompanyApi:list ", response);
        return response.data.data;
    }
}