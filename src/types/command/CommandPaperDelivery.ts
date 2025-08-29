export interface CommandPaperDelivery {
    id?: number;
    paperCompanyName: string; // 지업사명
    printCompanyName: string; // 인쇄소명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: number; // 수량
    iDate: string; // 지시일
    etc: string; // 비고
}

export interface CommandPaperDeliveryDto {
    id?: number;
    paperCompanyName: string; // 지업사명
    printCompanyName: string; // 인쇄소명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: string; // 수량
    iDate: string; // 지시일
    etc: string; // 비고
}

export const toCommandPaperDeliveryType = (dto: CommandPaperDeliveryDto): CommandPaperDelivery => ({
    ...dto,
    amount: Number(dto.amount.replace(/,/g, ""))
});

export const toCommandPaperDeliveryDto = (data: CommandPaperDelivery): CommandPaperDeliveryDto => ({
    ...data,
    amount: data.amount.toString()
});