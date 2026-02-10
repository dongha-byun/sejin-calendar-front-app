
export interface DiaryOrderOutOrder {
    orderId: number;
    orderNum: number;
    customerName: string;
    modelNum: string;
    amount: number;
    totalReleasedAmount: number;
    printCn: string;
    releaseNum: string;
}

export interface DiaryOrderOutReleaseRequest {
    orderNum: number;
    releaseDate: string;
    releaseAmount: number;
}  