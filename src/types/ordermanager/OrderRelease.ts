
export interface OrderRelease {
    id: number;
    orderNum: number;   // 주문접수번호
    rDate: string;      // 출고일자
    rAmount: number;    // 출고수량
}