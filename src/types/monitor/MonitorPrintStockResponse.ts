export interface PrintPutinDetailDto {
    putinPaperId: number;
    paperCompanyName: string;
    issueDate: string;
    weight: number;
    properties: string;
    standard: string;
    amount: number;
}

export interface PrintDeliveryDetailDto {
    commandPaperDeliveryId: number;
    paperCompanyName: string;
    issueDate: string;
    weight: number;
    properties: string;
    standard: string;
    amount: number;
    printCompanyName: string;
}

export interface PrintCommandDetailDto {
    commandPrintId: number;
    weight: number;
    properties: string;
    standard: string;
    amount: number;
    printCompanyName: string;
    statementNum: string;
    issueDate: string;
    modelNum: string;
    modelName: string;
    totalCount: number;
    state: string;
}

export interface PrintPutinSummaryDto {
    weight: number;
    properties: string;
    standard: string;
    totalAmount: number;
}

export interface PrintDeliverySummaryDto {
    weight: number;
    properties: string;
    standard: string;
    printCompanyName: string;
    totalAmount: number;
}

export interface PrintCommandSummaryDto {
    weight: number;
    properties: string;
    standard: string;
    printCompanyName: string;
    totalAmount: number;
}

export interface PrintCompanyStatistics {
    totalPutin: number;
    totalDelivery: number;
    totalPrint: number;
    totalPrice: number;
    paperCompanyStocks: number;
    printCompanyStocks: number;
}

export interface MonitorPrintStockResponse {
    detail: {
        putinList: PrintPutinDetailDto[];
        deliveryList: PrintDeliveryDetailDto[];
        printList: PrintCommandDetailDto[];
    };
    summary: {
        putinList: PrintPutinSummaryDto[];
        deliveryList: PrintDeliverySummaryDto[];
        printList: PrintCommandSummaryDto[];
    };
    statistics: PrintCompanyStatistics;
}
