import type { option } from "../values/OptionType";

// OrderType enum을 순회하면서 option 배열 생성 (enum 키를 value로 사용)
export const OrderTypeOptions: option[] = [
    {label: "접수번호순", value: "ORDER_NUM"},
    {label: "주문인순", value: "CUSTOMER_NAME"},
    {label: "모델#순", value: "MODEL_NUM"},
];

export const PrintCnTypeOptions: option[] = [
    {label: "백제본", value: "NO_PRINT"},
    {label: "상호", value: "PRINT"},
    {label: "기타", value: "ETC"},
];

export interface CommandOrderOutSearchDto {
    id: number,
    orderNum: number,
    customerName: string,
    modelNum: string,
    amount: number,
    printCn: string,
    dosu: string,
    etc1: string,
    isVisible: boolean,
}