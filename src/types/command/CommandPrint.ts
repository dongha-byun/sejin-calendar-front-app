export interface CommandPrint {
    id: number;
    statementNum: string;
    printCompanyName: string; // 인쇄소명
    modelNum: string;
    modelName: string;
    orderCount: number;
    spareCount: number;
    totalCount: number;
    coverWeight: number; // 무게(표)
    coverProperties: string; // 지질(표)
    coverStandard: string; // 규격(표)
    coverRequirePaper: number; // 용지량(표)
    coverSobu: number; // 소부(표)
    coverDosu: number; // 도수(표)
    innerWeight: number; // 무게(내)
    innerProperties: string; // 지질(내)
    innerStandard: string; // 규격(내)
    innerRequirePaper: number; // 용지량(내)
    innerSobu: number; // 소부(내)
    innerDosu: number; // 도수(내)
    iDate: string; // 지시일
    contents: string; // 지시사항
    etc: string; // 비고
}