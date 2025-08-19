export enum CompanyType {
  Material="자재관련",
  Printing="인쇄소",
  Paper="지업사",
  Binding="제본소",
  Agency="총판"
}

export const CompanyTypeList = Object.values(CompanyType);

export const CompanyTypeDescription: Record<CompanyType, string> = {
  [CompanyType.Material]: "자재관련",
  [CompanyType.Printing]: "인쇄소",
  [CompanyType.Paper]: "지업사",
  [CompanyType.Binding]: "제본소",
  [CompanyType.Agency]: "총판"
}

export interface CustomCompany {
  id?: number;
  companyType: CompanyType;
  name: string;
  ceo: string;
  bizNo: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  webhard: string;
  discountType: string;
  discountRate: number;
  etc: string;
  createdAt?: string; // yyyy-mm-dd
}