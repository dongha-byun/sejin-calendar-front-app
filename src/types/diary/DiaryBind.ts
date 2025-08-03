export interface DiaryBind {
    id: number;
    bindCompanyName: string; // 제본소명
    bindMethod: string; // 제본방식
    modelNum: string; // 모델
    modelName: string; // 모델명
    amount: number; // 수량
    printCn: string; // 상호
    iDate: string; // 작업일
    price: number; // 금액
    etc: string; // 비고
};