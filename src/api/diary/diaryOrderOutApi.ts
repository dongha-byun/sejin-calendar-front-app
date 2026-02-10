import type { DiaryOrderOutOrder, DiaryOrderOutReleaseRequest } from "../../types/diary/DiaryOrderOut";
import apiService from "../axiosInstance";
import type { SomsResponse } from "../somsResponse";

export const diaryOrderOutApi = {
    searchOrder: async (orderNum: number): Promise<SomsResponse<DiaryOrderOutOrder>> => {
        const response = await apiService.get(`/api/v1/diary/order-out/orders`, {
            orderNum: orderNum
        });
        return response.data;
    },
    saveOrderRelease: async (releaseRequests: DiaryOrderOutReleaseRequest[]) => {
        const body = {
            orders: releaseRequests
        };
        const response = await apiService.post(`/api/v1/diary/order-out/orders/release`, body);
        return response.data;
    }
}