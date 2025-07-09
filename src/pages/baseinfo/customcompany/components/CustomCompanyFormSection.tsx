import React, { useState } from "react";
import { type CustomCompany, CompanyType, CompanyTypeDescription } from "../../../../types/baseinfo/CustomCompany";
import SelectText from "../../../../component/input/SelectText";

// const categories: CompanyType[] = [
//   CompanyType.Material, CompanyType.Printing, CompanyType.Paper, CompanyType.Binding, CompanyType.Agency
// ];

const categoriesStringVer: string[] = [
  CompanyTypeDescription[CompanyType.Material],
  CompanyTypeDescription[CompanyType.Printing],
  CompanyTypeDescription[CompanyType.Paper],
  CompanyTypeDescription[CompanyType.Binding],
  CompanyTypeDescription[CompanyType.Agency]
]

interface Props {
  onAdd: (customCompany: CustomCompany) => void;
}

export default function CustomCompanyFormSection({ onAdd }: Props) {
  const [form, setForm] = useState<CustomCompany>({
    companyType: CompanyTypeDescription[CompanyType.Material],
    name: "",
    ceo: "",
    companyNum: "",
    address: "",
    tel: "",
    fax: "",
    email: "",
    webhard: "",
    discountType: "국내가",
    discountRate: 0,
    etc: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if(name === "discountRate") {
      if(!/^\d*\.?\d*$/.test(value)) {
        return ;
      }
    }

    console.log(`Changed ${name} to ${value}`);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("업체명은 필수입니다.");
      return;
    }

    const newCustomCompany: CustomCompany = {
      ...form,
      id: Date.now()
    };
    onAdd(newCustomCompany);
    setForm({ ...form, name: "", ceo: "", companyNum: "", address: "", tel: "", fax: "", email: "", webhard: "", discountRate: 0, etc: "" });
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
      <div>
        <label>분류 *</label>
        <SelectText options={categoriesStringVer.map(c => ({ value: c, label: c }))} />
      </div>
      <div>
        <label>업체명 *</label>
        <input name="name" value={form.name} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>대표자</label>
        <input name="ceo" value={form.ceo} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>사업자번호</label>
        <input name="companyNum" value={form.companyNum} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>주소</label>
        <input name="address" value={form.address} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>전화</label>
        <input name="tel" value={form.tel} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>팩스</label>
        <input name="fax" value={form.fax} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>E-mail</label>
        <input name="email" value={form.email} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>Webhard</label>
        <input name="webhard" value={form.webhard} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>할인요금</label>
        <input name="discountType" value={form.discountType} disabled className="w-full border rounded px-2 py-1 bg-gray-100" />
      </div>
      <div>
        <label>할인율 (%)</label>
        <input name="discountRate" value={form.discountRate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div>
        <label>기타</label>
        <input name="etc" value={form.etc} onChange={handleChange} className="w-full border rounded px-2 py-1" />
      </div>
      <div className="col-span-4 flex gap-2 justify-end mt-2">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
      </div>
    </div>
  );
}