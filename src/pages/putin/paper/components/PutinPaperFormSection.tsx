import { useEffect, useState } from "react";
import type { PutinPaperDto } from "../../../../types/putin/PutinPaper";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import { nowDate } from "../../../../utils/dateUtils";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import CommonSelect from "../../../../component/form/CommonSelect";
import { approvals, defaultApproval } from "../../../../types/values/GlobalValues";
import { formatNumber, padDecimal } from "../../../../utils/numberUtils";

interface Props {
    onAdd: (putinPaper: PutinPaperDto) => void;
    companies: CustomCompany[];
    papers: Paper[];
}

export default function PutinPaperFormSection({ onAdd, companies, papers }: Props) {
    const [form, setForm] = useState<PutinPaperDto>({
        companyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: "0",
        pricePer: "0",
        price: "0",
        issueDate: nowDate,
        approval: defaultApproval,
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
        const filtered = papers.filter(paper => paper.weight === form.weight).map(paper => paper.properties);
        setPropertiesList(makeDistinctArray(filtered));
    }, [form.weight]);

    useEffect(() => {
        const filtered = papers
            .filter(paper => paper.weight === form.weight)
            .filter(paper => paper.properties === form.properties)
            .map(paper => paper.standard);
        setStandardsList(makeDistinctArray(filtered));
    }, [form.properties]);

    useEffect(() => {
        const price = Number(form.amount.replace(/,/g, "")) * Number(form.pricePer.replace(/,/g, ""));
        setForm(prev => ({
            ...prev,
            price: formatNumber(price.toFixed(2))
        }));
    }, [form.amount, form.pricePer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "amount" || name === "price") {
            // 소수점 둘째자리까지 허용
            const raw = value.replace(/,/g, "");
            if(/^\d*\.?\d{0,2}$/.test(raw)) {
                setForm(prev => ({ ...prev, [name]: raw }));
            }
            return;
        }
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({
            companyName: '',
            weight: 0,
            properties: '',
            standard: '',
            amount: "0",
            pricePer: "0",
            price: "0",
            issueDate: nowDate,
            approval: defaultApproval,
            etc: ''
        });
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            if (name === "amount" || name === "price") {
                setForm(prev => ({ ...prev, [name]: padDecimal(value) }));
            }
        };

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    const companyNames = companies.map(company => company.name);

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="지업사명" required children={
                <CommonSelect 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="무게" children={
                <CommonSelect 
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    options={weights.map(w => ({ value: w, label: w }))} />
            } />
            <FormItem label="지질" children={
                <CommonSelect
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={propertiesList.map(p => ({ value: p, label: p }))} />
            } />
            <FormItem label="규격" children={
                <CommonSelect 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standardsList.map(s => ({ value: s, label: s }))} />
            } />

            {/* 3행 */}
            <FormItem label="수량" children={
                <InputText 
                    name="amount"
                    value={formatNumber(form.amount)}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    unitText="R"/>
            } />
            <FormItem label="단가" children={
                <InputText 
                    name="pricePer"
                    value={formatNumber(form.pricePer)}
                    onChange={handleChange} />
            } />
            <FormItem label="금액" children={
                <InputText 
                    name="price"
                    value={formatNumber(form.price)}
                    onChange={handleChange} 
                    onBlur={handleBlur}/>
            } />

            {/* 4행 */}
            <FormItem label="입고일" children={
                <InputText 
                    name="issueDate"
                    value={form.issueDate}
                    onChange={handleChange} />
            } />
            <div />
            <FormItem label="결제" children={
                <CommonSelect
                    name="approval"
                    value={form.approval}
                    onChange={handleChange}
                    options={approvals.map(method => ({ value: method, label: method }))} />
            } />
            
            {/* 6행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="비고" children={
                    <InputText 
                        name="etc"
                        value={form.etc}
                        onChange={handleChange} />
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}
