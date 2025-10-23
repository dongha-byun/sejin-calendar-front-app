import { apiService } from "../axiosInstance";

type PrintCnSearchResponse = {
    modelNum: string;
    printCn: string;
};

export const printCnSearchApi = {
    searchPrintCnList: async(modelNum?: string): Promise<PrintCnSearchResponse[]> => {
        let endpoint = "/api/v1/print-cn/search";
        const param = {
            modelNum: modelNum || undefined,
        };

        const response = await apiService.get(endpoint, param);
        return response.data.data;
    },
}