export interface Order {
    id: number;
    orderNum: string; // 접수번호
    customerName: string; // 주문인
    modelNum: string; // 모델
    modelName: string; // 모델명
    amount: number; // 주문량
    printCn: string; // 상호
    dosu: string; // 도수
    iDate: string; // 주문일자
    pricePer: number; // 단가
    price: number; // 금액
    deliveryMethod: string; // 납품방법
    pDate: string; // ???
    pMethod: string; // ???
    pCompleteDate: string; // ???
    boxDate: string; // 포장 날짜
    boxNum: string; // box 번호
    boxAmount: number; // box 수량
    rNum: string; // 출고증번호
    rDate: string; // 출고일자
    rCompleteDate: string; // 출고완료일자
    state: string; // 요금종류 (완/반/취)
    shipNum: string; // 선방번호
    etc1: string; // 비고1
    etc2: string; // 비고2
    etc3: string; // 비고3
}
