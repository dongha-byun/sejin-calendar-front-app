/** GET /api/v1/monitor/orders — 상호 검색 구분 (다른 화면 CommandOrderOutPrintPreview 와 동일) */
export type MonitorPrintCnType = "ALL" | "PRINT" | "NO_PRINT";

/** 모니터 주문 API 한 건 (서버 필드명) */
export interface MonitorOrderApiRow {
    id: number;
    orderNum: number;
    customerName: string;
    modelNum: string;
    modelName: string;
    amount: number;
    printCn: string;
    dosu: string;
    issueDate: string | null;
    pricePer: number;
    price: number;
    deliveryMethod: string;
    printDate: string | null;
    printMethod: string | null;
    printCompleteDate: string | null;
    boxDate: string | null;
    boxNum: string | null;
    boxAmount: number;
    releaseNum: number | null;
    releaseDate: string | null;
    releaseCompleteDate: string | null;
    state: string | null;
    shipNum: string;
    etc1: string;
    etc2: string;
    etc3: string;
}

export interface MonitorOrderHistoryBlock<T = unknown> {
    list: T[];
    totalAmount: number;
}

export interface MonitorPrintHistoryItem {
    amount: number;
    iDate: string;
    printCompanyName: string;
}

export interface MonitorMachineHistoryItem {
    amount: number;
    printCn: string;
    iDate: string;
}

export interface MonitorBindHistoryItem {
    amount: number;
    printCn: string;
    iDate: string;
}

export interface MonitorOrdersResponseData {
    orderList: MonitorOrderApiRow[];
    printHistory: MonitorOrderHistoryBlock<MonitorPrintHistoryItem>;
    machineHistory: MonitorOrderHistoryBlock<MonitorMachineHistoryItem>;
    bindHistory: MonitorOrderHistoryBlock<MonitorBindHistoryItem>;
}

/** GET /api/v1/monitor/orders/statistic */
export interface MonitorOrdersStatisticData {
    totalOrder: number;
    totalRelease: number;
    totalSample: number;
    notRelease: number;
    printQuantity: number;
    bindQuantity: number;
    acceptableMachine: number;
    acceptableBind: number;
}

export const emptyMonitorOrdersStatistic: MonitorOrdersStatisticData = {
    totalOrder: 0,
    totalRelease: 0,
    totalSample: 0,
    notRelease: 0,
    printQuantity: 0,
    bindQuantity: 0,
    acceptableMachine: 0,
    acceptableBind: 0,
};
