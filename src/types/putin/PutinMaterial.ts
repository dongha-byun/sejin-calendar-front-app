export interface PutinMaterial {
    id?: number;
    bindMethod: string; // 분류
    companyName: string; // 거래처
    standard1: string; // 규격1
    standard2: string; // 규격2
    contents: string; // 내역
    color: string; // 색상
    amount: number; // 수량
    pricePer: string; // 단가
    price: string; // 금액
    iDate: string; // 입고일자
    approval: string; // 결재
    etc: string; // 비고
}