import { useEffect, useState } from "react";
import CustomCompanyFormSection from "./components/CustomCompanyFormSection";
import CustomCompanyTable from "./components/CustomCompanyTable";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";

interface Props {
  companyType?: string;
  companyName?: string;
}

const typeFromProp = (s?: string): CompanyType => {
  if (!s) return CompanyType.Material;
  const found = Object.values(CompanyType).find(v => v === s);
  return (found as CompanyType) ?? CompanyType.Material;
};

const BaseInfoCustomCompanyPage: React.FC<Props> = ({ companyType, companyName }) => {
  const [customCompanies, setCustomCompanies] = useState<CustomCompany[]>([]);
  const [selectedType, setSelectedType] = useState<CompanyType>(() => typeFromProp(companyType));
  const [selectedName, setSelectedName] = useState<string>(companyName ?? "");
  useEffect(() => {
    setSelectedType(prev => typeFromProp(companyType) ?? prev);
  }, [companyType]);

  const refetch = () => {
    customCompanyApi.list(selectedType).then(setCustomCompanies);
  };

  useEffect(() => {
    refetch();
    setSelectedName(companyName ?? "");
  }, [selectedType, companyName]);

  const onChangeType = (type: CompanyType) => {
    setSelectedType(type);
  }

  const addCustomCompany = (customCompany: CustomCompany) => {
    customCompanyApi.save(customCompany).then(() => {
      refetch();
    });
  };

  return (
    <div className="px-6 py-3">
      <h1 className="text-base font-semibold pb-2">기초자료등록 - 거래처</h1>
      <CustomCompanyFormSection 
        onChangeType={onChangeType} onAdd={addCustomCompany} 
        selectedName={selectedName} selectedType={selectedType}
      />
      <CustomCompanyTable data={customCompanies} />
    </div>
  );
};

export default BaseInfoCustomCompanyPage;