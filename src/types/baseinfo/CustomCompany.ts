export enum CompanyType {
  Material="MATERIAL",
  Printing="PRINTING",
  Paper="PAPER",
  Binding="BINDING",
  Agency="AGENCY"
}

export const CompanyTypeDescription: Record<CompanyType, string> = {
  [CompanyType.Material]: "자재관련",
  [CompanyType.Printing]: "인쇄소",
  [CompanyType.Paper]: "지업사",
  [CompanyType.Binding]: "제본소",
  [CompanyType.Agency]: "총판"
}

export interface CustomCompany {
  id: number;
  companyType: CompanyType;
  name: string;
  ceo: string;
  registrationNumber: string;
  address: string;
  tel: string;
  fax: string;
  email: string;
  webhard: string;
  discountType: string;
  discountRate: number;
  etc: string;
}