import { useEffect, useState } from "react";
import type { CommandPaperDeliveryDto } from "../../../../types/command/CommandPaperDelivery";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import { nowDate } from "../../../../utils/dateUtils";
import { formatNumber, padDecimal } from "../../../../utils/numberUtils";
import CommonSelect from "../../../../component/form/CommonSelect";

interface Props {
    onAdd: (commandPaperDelivery: CommandPaperDeliveryDto) => void;
    paperCompanies: CustomCompany[];
    printCompanies: CustomCompany[];
    papers: Paper[];
}

export default function CommandPaperDeliveryFormSection({ onAdd, paperCompanies, printCompanies, papers }: Props) {
    const paperCompanyNames = paperCompanies.map(c => c.name);
    const printCompanyNames = printCompanies.map(c => c.name);
    const [form, setForm] = useState<CommandPaperDeliveryDto>({
        paperCompanyName: '',
        printCompanyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: "0",
        iDate: nowDate,
        etc: ''
    });
    const [weights, setWeights] = useState<number[]>([]);
    const [properties, setProperties] = useState<string[]>([]);
    const [standards, setStandards] = useState<string[]>([]);

    useEffect(() => {
        const weights = makeDistinctArray(papers.map(p => p.weight));
        setWeights(weights);
        setProperties([]);
        setStandards([]);
    }, [papers]);

    useEffect(() => {
        const properties = makeDistinctArray(papers.filter(p => p.weight === form.weight).map(p => p.properties));
        setProperties(properties);
        setStandards([]);
    }, [form.weight]);

    useEffect(() => {
       const standards = makeDistinctArray(papers.filter(p => p.weight === form.weight && p.properties === form.properties).map(p => p.standard));
       setStandards(standards);
    }, [form.properties]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "amount") {
            console.log(value);
            // 소수점 둘째자리까지 허용
            const raw = value.replace(/,/g, "");
            if(/^\d*\.?\d{0,2}$/.test(raw)) {
                setForm(prev => ({ ...prev, [name]: raw }));
            }
            return;
        }

        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "amount") {
            setForm(prev => ({ ...prev, [name]: padDecimal(value) }));
        }
    };

    const onInit = () => {
        setForm({
            paperCompanyName: '',
            printCompanyName: '',
            weight: 0,
            properties: '',
            standard: '',
            amount: "0",
            iDate: nowDate,
            etc: ''
        });
    }

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="지업사명" required children={
                <CommonSelect 
                    name="paperCompanyName"
                    value={form.paperCompanyName}
                    onChange={handleChange}
                    options={paperCompanyNames.map(c => ({ value: c, label: c }))} />
            } />
            <FormItem label="인쇄소명" required children={
                <CommonSelect 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={printCompanyNames.map(c => ({ value: c, label: c }))} />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="무게" required children={
                <CommonSelect 
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    options={weights.map(w => ({ value: w, label: w }))} />
            } />
            <FormItem label="지질" required children={
                <CommonSelect 
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={properties.map(p => ({ value: p, label: p }))} />
            } />
            <FormItem label="규격" required children={
                <CommonSelect 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standards.map(s => ({ value: s, label: s }))} />
            } />

            {/* 3행 */}
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={formatNumber(form.amount)}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    unitText="R"/>
            } />
            <div />
            <FormItem label="지시일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
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