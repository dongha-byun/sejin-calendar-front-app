export interface DiaryBoxingOrder {
    orderId: number;
    orderNum: number;
    customerName: string;
    modelNum: string;
    modelName: string;
    amount: number;
    printCn: string;
    boxDate: string;
    modelBox: string;
    defaultModelBoxCount: number;
    realBox: string;
    realBoxCount: number;
};

export interface DiaryBoxingOrderRequest {
    orderId: number;
    boxNum: string;
    boxAmount: number;
    boxDate: string;
}