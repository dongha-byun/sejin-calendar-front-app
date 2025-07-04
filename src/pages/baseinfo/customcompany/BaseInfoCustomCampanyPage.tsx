import { useEffect, useState } from "react";
import CustomCompanyFormSection from "./components/CustomCompanyFormSection";
import CustomCompanyTable from "./components/CustomCompanyTable";
import { type CustomCompany } from "../../../types/baseinfo/CustomCompany";

export default function BaseInfoCustomCompanyPage() {
  const [customCompanies, setCustomCompanies] = useState<CustomCompany[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("customCompanies");
    if (saved) setCustomCompanies(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("customCompanies", JSON.stringify(customCompanies));
  }, [customCompanies]);

  const addCustomCompany = (customCompany: CustomCompany) => {
    setCustomCompanies(prev => [...prev, customCompany]);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">거래처 등록</h1>
      <CustomCompanyFormSection onAdd={addCustomCompany} />
      <CustomCompanyTable data={customCompanies} />
    </div>
  );
}