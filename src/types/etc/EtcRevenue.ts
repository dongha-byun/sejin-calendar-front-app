export type RevenuePrintCnType = 'ALL' | 'PRINT' | 'NO_PRINT';

export interface EtcRevenueRow {
    orderId: number;
    modelNum: string;
    modelName?: string;
    customerName: string;
    printCn: string;
    state?: string;
    issueDate: string;
    amount: number;
    price: number;
    printCompleteDate?: string | null;
    boxDate?: string | null;
    releaseCompleteDate?: string | null;
}

export interface EtcRevenueSummaryData {
    receiveAmount: number;
    releaseAmount: number;
    unreleaseAmount: number;
    receivePrice: number;
    releasePrice: number;
}

export interface EtcRevenueQuery {
    startDate: string;
    endDate: string;
    modelNum?: string;
    customerName?: string;
    printCnType: RevenuePrintCnType;
    printCnKeyword?: string;
}

export const emptyRevenueSummary: EtcRevenueSummaryData = {
    receiveAmount: 0,
    releaseAmount: 0,
    unreleaseAmount: 0,
    receivePrice: 0,
    releasePrice: 0,
};
