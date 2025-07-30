export interface PutinPaper {
    id?: number; // ID
    companyName: string; // 거래처명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: number; // 수량
    pricePer: number; // 단가
    price: number; // 금액
    iDate: string; // 입고일자
    approval: string; // 결재
    etc: string; // 비고
}