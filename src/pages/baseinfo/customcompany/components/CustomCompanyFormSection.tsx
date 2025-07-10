import React, { useState } from "react";
import { type CustomCompany, CompanyType, CompanyTypeDescription } from "../../../../types/baseinfo/CustomCompany";
import SelectText from "../../../../component/form/SelectText";
import FormItem from "../../../../component/form/FormItem";
import FormRow from "../../../../component/form/FormRow";
import InputText, { InputTextSize } from "../../../../component/form/InputText";

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
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-100 rounded shadow max-w-4xl mb-4">
      <FormRow>
        <FormItem label="분류" required children={
          <SelectText options={categoriesStringVer.map(c => ({ value: c, label: c }))} />
        } />
      </FormRow>
      <FormRow>
        <FormItem label="업체명" required children={
          <input name="name" value={form.name} onChange={handleChange} className="w-36 border rounded p-1.5" />
        } />
        <FormItem label="대표자" children={
          <input name="ceo" value={form.ceo} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
        <FormItem label="사업자번호" children={
          <input name="companyNum" value={form.companyNum} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
      </FormRow>
      <FormRow>
        <FormItem label="주소" children={
          <InputText name="address" value={form.address} onChange={handleChange} size={InputTextSize.Full} />
        } />
      </FormRow>
      <FormRow>
        <FormItem label="전화" children={
          <input name="tel" value={form.tel} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
        <FormItem label="팩스" children={
          <input name="fax" value={form.fax} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
        <FormItem label="E-mail" children={
          <input name="email" value={form.email} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
      </FormRow>
      <FormRow>
        <FormItem label="Webhard" children={
          <input name="webhard" value={form.webhard} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
        <FormItem label="할인요금" children={
          <input name="discountType" value={form.discountType} disabled className="w-36 border rounded px-2 py-1 bg-gray-100" />
        } />
        <FormItem label="할인율 (%)" children={
          <input name="discountRate" value={form.discountRate} onChange={handleChange} className="w-36 border rounded px-2 py-1" />
        } />
      </FormRow>
      <FormRow>
        <FormItem label="기타" children={
          <InputText name="etc" value={form.etc} onChange={handleChange} size={InputTextSize.Full} />
        } />
      </FormRow>
      <div className="col-span-4 flex gap-2 justify-start mt-2">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
      </div>
    </div>
  );
}