import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";

interface SearchReq {
    weight: number;
    properties: string;
    standard: string;
    paperCompanyName: string;
    printCompanyName: string;
}

export default function MonitorPaperFormSection() {
    const [form, setForm] = useState<SearchReq>({
        weight: 0,
        properties: '',
        standard: '',
        paperCompanyName: '',
        printCompanyName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const weights = [
        60, 70, 80, 90, 100
    ];

    const properties = [
        "지질A", "지질B", "지질C", 
    ];

    const standards = [
        "규격1", "규격2", "규격3", "규격4"
    ];

    const companyNames = [
        "거래처1", "거래처2", "거래처3",
    ];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="무게" children={
                <SelectText 
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    options={weights.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="지질" children={
                <SelectText 
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={properties.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격" children={
                <SelectText 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standards.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="" children={
                <>
                <input type="checkbox" />
                <label>상세보기</label>
                </>
            } />

            {/* 2행 */}
            <FormItem label="지업사" children={
                <SelectText 
                    name="paperCompanyName"
                    value={form.paperCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="인쇄소" children={
                <SelectText 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />
        </div>
    );
}