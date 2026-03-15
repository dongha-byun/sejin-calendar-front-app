export interface MonitorMaterialSearchResponse {
    putinDetailList: MonitorMaterialPutinDetailResponse[];
    putinSummaryList: MonitorMaterialPutinSummaryResponse[];
    usageDetailList: MonitorMaterialUsageDetailResponse[];
    usageSummaryList: MonitorMaterialUsageSummaryResponse[];
    totalPutinAmount: number;
    totalUsageAmount: number;
    currentUsableAmount: number;
}

export interface MonitorMaterialPutinDetailResponse {
    companyName: string;
    standard1: string;
    standard2: string;
    contents: string;
    color: string;
    iDate: string;
    amount: number;
}

export interface MonitorMaterialPutinSummaryResponse {
    amount: number;
    standard1: string;
}

export interface MonitorMaterialUsageDetailResponse {
    iDate: string;
    amount: number;
    modelNum: string;
    modelName: string;
    width: string;
    companyName: string;
}

export interface MonitorMaterialUsageSummaryResponse {
    amount: number;
    width: string;
}