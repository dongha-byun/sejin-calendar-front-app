import { useState } from "react";
import SelectText from "../../../../component/form/SelectText";
import FormItem from "../../../../component/form/FormItem";

interface SearchReq {
    modelNum: string;
    printCompanyName: string;
}

export default function DiaryPrintFormSection() {
    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
        printCompanyName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const modelNums = [
        "모델A", "모델B", "모델C", "모델D",
    ];

    const companyNames = [
        "인쇄소1", "인쇄소2", "인쇄소3", "인쇄소4",
    ];

    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-200 rounded shadow max-w-xl mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="호수" children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange} 
                    options={modelNums.map(model => ({value: model, label: model}))} />
            } />
            <FormItem label="인쇄소명" children={
                <SelectText 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange} 
                    options={companyNames.map(model => ({value: model, label: model}))} />
            } />
            
            
        </div>
    );
}