import { useEffect, useState } from "react";
import SelectText from "../../../../component/form/SelectText";
import FormItem from "../../../../component/form/FormItem";
import type { Model } from "../../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";

interface Props {
    models: Model[];
    companies: CustomCompany[];
    searchFunc: (companyName: string, modelNum: string) => void;
}

interface SearchReq {
    modelNum: string;
    printCompanyName: string;
}

export default function DiaryPrintFormSection({models, companies, searchFunc}: Props) {
    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
        printCompanyName: ''
    });
    const [modelNums, setModelNums] = useState<string[]>([]);
    const [companyNames, setCompanyNames] = useState<string[]>([]);

    useEffect(() => {
        setModelNums(models.map(m => m.modelNum));
    }, [models]);

    useEffect(() => {
        setCompanyNames(companies.map(c => c.name));
    }, [companies]);

    useEffect(() => {
        searchFunc(form.printCompanyName, form.modelNum);
    }, [form.modelNum, form.printCompanyName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

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