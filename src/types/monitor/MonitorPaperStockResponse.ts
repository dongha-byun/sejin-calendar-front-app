export interface PaperPutinDetailDto {
    putinPaperId: number;
    paperCompanyName: string;
    putinDate: string;
    amount: number;
    pricePer: number;
    price: number;
}

export interface CommandDeliveryDetailDto {
    commandPaperDeliveryId: number;
    paperCompanyName: string;
    deliveryDate: string;
    amount: number;
    printCompanyName: string;
}

export interface CommandPrintDetailDto {
    commandPrintId: number;
    statementNum: string;
    printCompanyName: string;
    printDate: string;
    amount: number | null;
    modelNum: string;
    modelName: string;
    totalCount: number;
    state: string;
}

export interface PaperPutinSummaryDto {
    paperCompanyName: string;
    totalAmount: number;
    totalPrice: number;
}

export interface DeliverySummaryDto {
    paperCompanyName: string;
    printCompanyName: string;
    totalAmount: number;
}

export interface PrintSummaryDto {
    printCompanyName: string;
    totalAmount: number;
}

export interface PaperStockStatistics {
    totalPutin: number;
    totalDelivery: number;
    totalPrint: number;
    totalPrice: number;
    paperCompanyStocks: number;
    printCompanyStocks: number;
}

export interface MonitorPaperStockResponse {
    detail: {
        putinList: PaperPutinDetailDto[];
        commandDeliveryList: CommandDeliveryDetailDto[];
        commandPrintList: CommandPrintDetailDto[];
    };
    summary: {
        putinList: PaperPutinSummaryDto[];
        deliveryList: DeliverySummaryDto[];
        printList: PrintSummaryDto[];
    };
    paperStockStatistics: PaperStockStatistics;
}
