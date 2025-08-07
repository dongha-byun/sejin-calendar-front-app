import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";

interface SearchReq {
    bindMethod: string;
    companyName: string;
    standard1: string;
    standard2: string;
    contents: string;
    color: string;
}

export default function MonitorMaterialFormSection() {
    const [form, setForm] = useState<SearchReq>({
        bindMethod: '',
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const bindMethods = [
        "TWIN", "아스테지", "에구다"
    ];

    const companyNames = [
        "거래처1", "거래처2", "거래처3",
    ];

    const standard1s = [
        "규격1-A", "규격1-B", "규격1-C", "규격1-D",
    ];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="분류" children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="거래처" required children={
                    <SelectText 
                        name="companyName"
                        value={form.bindMethod}
                        onChange={handleChange}
                        options={companyNames.map(method => ({ value: method, label: method }))} />
                } />
            </div>
            <FormItem label="상세보기" children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />

            {/* 2행 */}
            <FormItem label="규격1" children={
                <SelectText 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1s.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격2" required children={
                <SelectText 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard1s.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="내역" required children={
                <SelectText 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={standard1s.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="색상" children={
                <SelectText 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            
        </div>
    );
}