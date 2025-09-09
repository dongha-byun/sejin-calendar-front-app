import { useEffect, useState } from "react";
import CustomCompanyFormSection from "./components/CustomCompanyFormSection";
import CustomCompanyTable from "./components/CustomCompanyTable";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";

interface Props {
  companyType?: string;
  companyName?: string;
}

const BaseInfoCustomCompanyPage: React.FC<Props> = ({ companyType, companyName }) => {
  const [customCompanies, setCustomCompanies] = useState<CustomCompany[]>([]);
  const [selectedType, setSelectedType] = useState<CompanyType>(CompanyType.Material);

  useEffect(() => {
    console.log(companyType, companyName);
    fetch();
  }, [selectedType]);

  const fetch = () => {
    customCompanyApi.list(selectedType).then(setCustomCompanies);
  }

  const onChangeType = (type: CompanyType) => {
    setSelectedType(type);
  }

  const addCustomCompany = (customCompany: CustomCompany) => {
    customCompanyApi.save(customCompany).then(() => {
      fetch();
    });
  };

  return (
    <div className="px-6 py-3">
      <h1 className="text-base font-semibold pb-2">기초자료등록 - 거래처</h1>
      <CustomCompanyFormSection onChangeType={onChangeType} onAdd={addCustomCompany} />
      <CustomCompanyTable data={customCompanies} />
    </div>
  );
};

export default BaseInfoCustomCompanyPage;