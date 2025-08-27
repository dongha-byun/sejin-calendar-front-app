export interface PutinPaper {
    id?: number; // ID
    companyName: string; // 거래처명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: number; // 수량
    pricePer: number; // 단가
    price: number; // 금액
    issueDate: string; // 입고일자
    approval: string; // 결재
    etc: string; // 비고
}

export interface PutinPaperDto {
    id?: number; // ID
    companyName: string; // 거래처명
    weight: number; // 무게
    properties: string; // 지질
    standard: string; // 규격
    amount: string; // 수량
    pricePer: string; // 단가
    price: string; // 금액
    issueDate: string; // 입고일자
    approval: string; // 결재
    etc: string; // 비고
}

export const toPutinPaperDto = (paper: PutinPaper): PutinPaperDto => ({
    ...paper,
    amount: paper.amount.toString(),
    pricePer: paper.pricePer.toString(),
    price: paper.price.toString()
}); 

export const toPutinPaperType = (dto: PutinPaperDto): PutinPaper => ({
    ...dto,
    amount: Number(dto.amount.replace(/,/g, "")),
    pricePer: Number(dto.pricePer.replace(/,/g, "")),
    price: Number(dto.price.replace(/,/g, ""))
});