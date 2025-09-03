import type { CustomCompany } from "../../types/baseinfo/CustomCompany";
import apiService from "../axiosInstance"

export const customCompanyApi = {
    save: async (data: CustomCompany) => {
        await apiService.post("/api/v1/custom-company", data);
    },
    list: async (companyType?: string) => {
        let endPoint = "/api/v1/custom-company";
        if(companyType) {
            endPoint += "?companyType=" + companyType;
        }
        const response = await apiService.get(endPoint);
        return response.data.data;
    }
}