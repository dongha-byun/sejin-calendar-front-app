
export interface Order {
    id?: number;
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

export interface OrderDto {
    id?: number;
    orderNum: string; // 접수번호
    customerName: string; // 주문인
    modelNum: string; // 모델
    modelName: string; // 모델명
    amount: string; // 주문량
    printCn: string; // 상호
    dosu: string; // 도수
    iDate: string; // 주문일자
    pricePer: string; // 단가
    price: string; // 금액
    deliveryMethod: string; // 납품방법
    pDate: string; // ???
    pMethod: string; // ???
    pCompleteDate: string; // ???
    boxDate: string; // 포장 날짜
    boxNum: string; // box 번호
    boxAmount: string; // box 수량
    rNum: string; // 출고증번호
    rDate: string; // 출고일자
    rCompleteDate: string; // 출고완료일자
    state: string; // 요금종류 (완/반/취)
    shipNum: string; // 선방번호
    etc1: string; // 비고1
    etc2: string; // 비고2
    etc3: string; // 비고3
}

export const toOrderType = (dto: OrderDto): Order => ({
    ...dto,
    amount: Number(dto.amount.replace(/,/g, "")),
    pricePer: Number(dto.pricePer.replace(/,/g, "")),
    price: Number(dto.pricePer.replace(/,/g, "")),
    boxAmount: Number(dto.boxAmount.replace(/,/g, "")),
});

export const toOrderDto = (data: Order): OrderDto => ({
    ...data,
    amount: data.amount.toString(),
    pricePer: data.pricePer.toString(),
    price: data.price.toString(),
    boxAmount: data.boxAmount.toString(),
});

// 주문 정보 생성 관련 dto
export interface OrderCreateRequest {
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
    shipNum: string; // 선방번호
    etc1: string; // 비고1
    etc2: string; // 비고2
    etc3: string; // 비고3
    checkedReleaseNumAutoCreate: boolean; // 출고증 번호 자동 부여
}

export interface OrderCreateRequestDto {
    orderNum: string; // 접수번호
    customerName: string; // 주문인
    modelNum: string; // 모델
    modelName: string; // 모델명
    amount: string; // 주문량
    printCn: string; // 상호
    dosu: string; // 도수
    iDate: string; // 주문일자
    pricePer: string; // 단가
    price: string; // 금액
    deliveryMethod: string; // 납품방법
    shipNum: string; // 선방번호
    etc1: string; // 비고1
    etc2: string; // 비고2
    etc3: string; // 비고3
    checkedReleaseNumAutoCreate: boolean; // 출고증 번호 자동 부여
}

export const toOrderCreateRequest = (dto: OrderCreateRequestDto): OrderCreateRequest => ({
    ...dto,
    amount: Number(dto.amount.replace(/,/g, "")),
    pricePer: Number(dto.pricePer.replace(/,/g, "")),
    price: Number(dto.pricePer.replace(/,/g, "")),
});

export const toOrderCreateRequestDto = (data: OrderCreateRequest): OrderCreateRequestDto => ({
    ...data,
    amount: data.amount.toString(),
    pricePer: data.pricePer.toString(),
    price: data.price.toString(),
});