export interface CommandPaperDelivery {
    id: number;
    paperCompanyName: string; // 지업사명
    printCompanyName: string; // 인쇄소명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: number; // 수량
    iDate: string; // 지시일
    etc: string; // 비고
}