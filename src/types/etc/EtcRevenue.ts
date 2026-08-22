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
    totalAmount: number;
    totalPrice: number;
    releasedAmount: number;
    releasedPrice: number;
    unreleasedAmount: number;
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
    totalAmount: 0,
    totalPrice: 0,
    releasedAmount: 0,
    releasedPrice: 0,
    unreleasedAmount: 0,
};
