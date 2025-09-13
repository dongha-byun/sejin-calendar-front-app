import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Model } from "../../../../types/baseinfo/Model";
import type { option } from "../../../../types/values/OptionType";
import CommonSelect from "../../../../component/form/CommonSelect";

interface Props {
    companies: CustomCompany[];
    models: Model[];
    setSelectedCompany: React.Dispatch<React.SetStateAction<CustomCompany | undefined>>;
    setSelectedModel: React.Dispatch<React.SetStateAction<Model | undefined>>;
    form: SearchReq;
    setForm: React.Dispatch<React.SetStateAction<SearchReq>>;
    focusOrder: (orderNum: string) => void;
}

interface SearchReq {
    customerName?: string;
    modelNum?: string;
    modelName: string;
    orderNum?: string;    
}

export default function OrderManagerCancelFormSection (
    {companies, models, setSelectedCompany, setSelectedModel, form, setForm, focusOrder}: Props
) {
    const [companyNames, setCompanyNames] = useState<option[]>([]);
    const [modelNums, setModelNums] = useState<option[]>([]);

    useEffect(() => {
        const allOption = { value: undefined, label: '모두' };
        const companyNames = companies.map(c => ({ value: c.name, label: c.name }));
        const modelNums = models.map(m => ({ value: m.modelNum, label: m.modelNum }));

        setCompanyNames([allOption, ...companyNames]);
        setModelNums([allOption, ...modelNums]);
    }, [companies, models]);

    useEffect(() => {
        const company = companies.find(c => c.name === form.customerName);
        setSelectedCompany(company);
    }, [form.customerName]);

    useEffect(() => {
        const model = models.find(c => c.modelNum === form.modelNum);
        setForm(prev => ({
            ...prev,
            modelName: model?.modelName || ""
        }));
        setSelectedModel(model);
    }, [form.modelNum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="주문인" children={
                <CommonSelect 
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    options={companyNames} />
            } />
            <FormItem label="호수" children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums} />
            } />
            <FormItem label="모델명 : " children={
                <span className="flex gap-2 items-center">{form.modelName}</span>
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="접수번호" children={
                    <>
                    <InputText 
                        name="orderNum"
                        size={InputTextSize.Medium}
                        value={form.orderNum}
                        onChange={handleChange} 
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                focusOrder(form.orderNum || '');
                            }
                        }}
                        />
                    <button className="border border-gray-400 text-black px-4 py-1" onClick={() => focusOrder(form.orderNum || '')}>접수번호검색</button>
                    </>
                } />
            </div>
        </div>
    );
}