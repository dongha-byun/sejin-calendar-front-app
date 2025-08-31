export interface CommandBind {
    id?: number;
    bindCompanyName : string; // 제본소명
    modelNum : string; // 모델
    modelName : string; // 모델명
    bindMethod : string; // 제본방식
    amount : number; // 수량
    printCompanyName : string; // 인쇄소명
    iDate : string; // 지시일
    contents : string; // 지시사항
    etc : string; // 비고
}

export interface CommandBindDto {
    id ?: number;
    bindCompanyName : string; // 제본소명
    modelNum : string; // 모델
    modelName : string; // 모델명
    bindMethod : string; // 제본방식
    amount : string; // 수량
    printCompanyName : string; // 인쇄소명
    iDate : string; // 지시일
    contents : string; // 지시사항
    etc : string; // 비고
}

export const toCommandBindType = (dto: CommandBindDto): CommandBind => ({
    ...dto,
    amount: Number(dto.amount.replace(/,/g, ""))
});

export const toCommandBindDto = (data: CommandBind): CommandBindDto => ({
    ...data,
    amount: data.amount.toString()
});