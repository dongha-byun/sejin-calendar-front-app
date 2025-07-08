
export interface OrderPaper {
    id?: number;
    statementNum: string; // 전표번호
    companyName: string; // 지업사명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: number; // 수량
    iDate: string; // 주문일
    etc: string; // 비고
}