export interface MonitorModelSearchResponse {  
    printInfo: History<MonitorModelPrintHistoryResponse>;
    machineInfo: History<MonitorModelMachineHistoryResponse>;
    bindInfo: History<MonitorModelBindHistoryResponse>;
}

export interface History<T> {
    list: T[];
    totalAmount: number;
}

export const EMPTY_HISTORY: History<any> = {
    list: [],
    totalAmount: 0,
};

export interface MonitorModelPrintHistoryResponse {
    printDate: string;
    printCompanyName: string;
    totalCount: number;
}

export interface MonitorModelMachineHistoryResponse {
    iDate: string;
    amount: number;
    printCn: string;
    machineNum: string;
    etc: string;
}

export interface MonitorModelBindHistoryResponse {
    iDate: string;
    amount: number;
    printCn: string;
    bindMethod: string;
    etc: string;
}