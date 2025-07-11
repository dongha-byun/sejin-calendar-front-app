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
    <div className="px-6 py-3">
      <h1 className="text-base font-semibold pb-2">기초자료등록 - 거래처</h1>
      <CustomCompanyFormSection onAdd={addCustomCompany} />
      <CustomCompanyTable data={customCompanies} />
    </div>
  );
}