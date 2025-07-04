import type { CustomCompany } from "../../../types/baseinfo/CustomCompany";
import apiService from "../../axiosInstance"

const customCompanyApi = {
    save: async (data: CustomCompany) => {
        await apiService.post("/api/v1/custom-company", data);
    }
}