
export interface OrderMaterial {
  id?: number;
  statementNum: string; // 전표번호
  bindMethod: string; // 분류
  companyName: string; // 거래처
  standard1: string; // 규격1
  standard2: string; // 규격2
  contents: string; // 내역
  color: string;
  amount: number; // 수량
  iDate: string; // 발주일자
  demandDate: string; // 납품요구일
  etc: string; // 비고
}