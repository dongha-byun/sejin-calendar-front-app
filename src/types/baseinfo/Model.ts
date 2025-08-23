
// 금구, PVC 홀더, 탄자크, TWIN, TW 아스테지, 탁상, 반달고리, TW 홀더, STITCH, 기타
export enum ModelBindMethod {
    IRON = "금구",
    PVC = "PVC 홀더",
    TANZAC = "탄자크",
    TWIN = "TWIN",
    TW_ASTATE = "TW 아스테지",
    DESK = "탁상",
    HALF_MOON = "반달고리",
    TW_HOLDER = "TW 홀더",
    STITCH = "STITCH",
    ETC = "기타",
}

export interface Model {
    id?: number;
    modelNum: string;       // model
    modelName: string;      // 모델명

    width: string;          // 가로
    height: string;         // 세로
    pages: number;          // 매수
    bindMethod: string;     // 제본 방식

    priceInternal: number;  // 국내가 
    priceExternalA1: number; // 해외가 A1
    priceExternalA2: number; // 해외가 A2
    priceExternalB: number;  // 해외가 B
    
    coverWeight: string;     // 무게 (표)
    coverProperties: string; // 지질 (표)
    coverStandard: string;   // 규격 (표)
    coverRequirePaper: number;  // 부당용지소요량(표)
    coverSobu: number;         // 소부(표)
    coverDosu: number;         // 도수(표)

    innerWeight: string;        // 무게 (내)
    innerProperties: string;    // 지질 (내)
    innerStandard: string;      // 규격 (내)
    innerRequirePaper: number;  // 부당용지소요량(내)
    innerSobu: number;         // 소부(내)
    innerDosu: number;         // 도수(내)
    
    pricePerBinding: number;    // 제본 단가
    standardInch: string;   // 규격 (inch)
    companyNameCm: string;      // 상호규격 (cm)
    companyNameInch: string;    // 상호규격 (inch)
    
    box: string;                // 사용 box
    countPerBox: number;        // 부수/box
    printMethod: string;        // 쇄입방법   
    
    createdAt: string; // yyyy-mm-dd 형식
}