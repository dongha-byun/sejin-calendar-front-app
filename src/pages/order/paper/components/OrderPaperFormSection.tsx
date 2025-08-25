import { useEffect, useState } from "react";
import type { OrderPaper } from "../../../../types/order/OrderPaper";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import CommonSelect from "../../../../component/form/CommonSelect";
import { nowDate } from "../../../../utils/dateUtils";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

interface Props {
    onAdd: (orderPaper: OrderPaper) => void;
    companies: CustomCompany[];
    papers: Paper[];
}

export default function OrderPaperFormSection({ onAdd, companies, papers }: Props) {
    const [form, setForm] = useState<OrderPaper>({
        statementNum: '',
        companyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: 0,
        iDate: nowDate,
        etc: ''
    });

    const [weights, setWeights] = useState<number[]>([]);
    const [propertiesList, setPropertiesList] = useState<string[]>([]);
    const [standardsList, setStandardsList] = useState<string[]>([]);

    useEffect(() => {
        setWeights(makeDistinctArray(papers.map(paper => paper.weight)));
        setPropertiesList([]);
        setStandardsList([]);
    }, [papers]);

    useEffect(() => {
        const filteredPropertiesList = papers.filter(p => p.weight === form.weight).map(p => p.properties);
        setPropertiesList(makeDistinctArray(filteredPropertiesList));
        setStandardsList([]);
    }, [form.weight]);

    useEffect(() => {
        const filteredStandardsList = papers
            .filter(p => p.weight === form.weight && p.properties === form.properties)
            .map(p => p.standard);
        setStandardsList(makeDistinctArray(filteredStandardsList));
    }, [form.properties]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({ ...form, statementNum: '', companyName: '', weight: 0, properties: '', standard: '', amount: 0, iDate: nowDate, etc: '' });
    }

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    const paperCompanyName = companies.map(c => c.name);

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 min-w-[500px] max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="지업사명" required children={
                <CommonSelect 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={paperCompanyName.map(c => ({ value: c, label: c }))} />
            } />
            <div />
            <div className="text-right text-red-500" >전표번호 : </div>
        
            {/* 2행 */}
            <FormItem label="무게" required children={
                <CommonSelect 
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    options={weights.map(c => ({ value: c, label: c }))} />
            } />
            <FormItem label="지질" required children={
                <CommonSelect 
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={propertiesList.map(c => ({ value: c, label: c }))} />
            } />
            <FormItem label="규격" required children={
                <CommonSelect 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standardsList.map(c => ({ value: c, label: c }))} />
            } />
        
            {/* 3행 */}
            <FormItem label="수량" required children={
                <InputText name="amount" value={form.amount} onChange={handleChange} unitText="R"/>
            } />
            <FormItem label="주문일" required children={
                <InputText name="iDate" value={form.iDate} onChange={handleChange} />
            } />
            <div />
        
            {/* 4행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="비고" children={
                    <InputText name="etc" value={form.etc} onChange={handleChange} /> 
                } /> 
            </div>
            

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}