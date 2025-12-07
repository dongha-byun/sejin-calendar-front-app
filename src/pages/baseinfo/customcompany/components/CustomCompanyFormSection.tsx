import React, { useState } from "react";
import { type CustomCompany, CompanyType, CompanyTypeList } from "../../../../types/baseinfo/CustomCompany";
import SelectText from "../../../../component/form/SelectText";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";

interface Props {
  onAdd: (customCompany: CustomCompany) => void;
  onChangeType: (type: CompanyType) => void;
}

export default function CustomCompanyFormSection({ onAdd, onChangeType }: Props) {
  const [form, setForm] = useState<CustomCompany>({
    companyType: CompanyType.Material,
    name: "",
    ceo: "",
    bizNo: "",
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
    console.log(name, value);

    if(name === "companyType") {
      console.log(value);
      onChangeType(value as CompanyType);
    }

    if(name === "discountRate") {
      if(!/^\d*\.?\d*$/.test(value)) {
        return ;
      }
    }

    console.log(`Changed ${name} to ${value}`);
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const onInit = () => {
    setForm({
      companyType: CompanyType.Material,
      name: "",
      ceo: "",
      bizNo: "",
      address: "",
      tel: "",
      fax: "",
      email: "",
      webhard: "",
      discountType: "국내가",
      discountRate: 0,
      etc: ""
    });
  }

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
    onInit();
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 w-[960px]">
      {/* 1행 */}
      <FormItem label="분류" required children={
        <SelectText 
          name="companyType"
          value={form.companyType}
          onChange={handleChange}
          options={CompanyTypeList.map(c => ({ value: c, label: c }))} />
      } />
      <div />
      <div />

      {/* 2행 */}
      <FormItem label="업체명" required children={
        <InputText name="name" value={form.name} onChange={handleChange} />
      } />
      <FormItem label="대표자" children={
        <InputText name="ceo" value={form.ceo} onChange={handleChange} />
      } />
      <FormItem label="사업자번호" children={
        <InputText name="bizNo" value={form.bizNo} onChange={handleChange} />
      } />

      {/* 3행 */}
      <div className="flex gap-2 col-span-3">
        <FormItem label="주소" children={
          <InputText name="address" value={form.address} onChange={handleChange} size={InputTextSize.Full} />
        } />
      </div>

      {/* 4행 */}
      <FormItem label="전화" children={
        <InputText name="tel" value={form.tel} onChange={handleChange} />
      } />
      <FormItem label="팩스" children={
        <InputText name="fax" value={form.fax} onChange={handleChange} />
      } />
      <FormItem label="E-mail" children={
        <InputText name="email" value={form.email} onChange={handleChange} />
      } />

      {/* 5행 */}
      <FormItem label="Webhard" children={
        <InputText name="webhard" value={form.webhard} onChange={handleChange} />
      } />
      <FormItem label="할인요금" children={
        <InputText name="discountType" value={form.discountType} onChange={handleChange} readOnly />
      } />
      <FormItem label="할인율" children={
        <InputText name="discountRate" value={form.discountRate} onChange={handleChange} unitText="%" />
      } />

      {/* 6행 */}
      <div className="flex gap-2 col-span-3">
        <FormItem label="기타" children={
          <InputText name="etc" value={form.etc} onChange={handleChange} size={InputTextSize.Full} />
        } />
      </div>

      <div className="flex gap-2 mt-2">
        <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">저장</button>
        <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">초기화</button>
      </div>
    </div>
  );
}