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
}

interface SearchReq {
    customerName?: string;
    modelNum?: string;
    modelName: string;
    orderNum?: string;    
}

export default function OrderManagerCancelFormSection ({companies, models, setSelectedCompany, setSelectedModel}: Props) {
    const [form, setForm] = useState<SearchReq>({
        customerName: undefined,
        modelNum: undefined,
        modelName: '',
        orderNum: ''
    });
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

    const onInit = () => {
        console.log('취소 버튼 로직 호출');
    };

    const handleSubmit = () => {
        console.log('선택완료 버튼 로직 호출');
    }

    const onExit = () => {
        console.log('종료 버튼 로직 호출');
    }

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
                        onChange={handleChange} />
                    <button className="border border-gray-400 text-black px-4 py-1">접수번호검색</button>
                    </>
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onExit} className="bg-red-500 text-white px-4 py-1 rounded">종료</button>
            </div>
        </div>
    );
}