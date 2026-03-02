import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import type { Model } from "../../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { option } from "../../../../types/values/OptionType";

interface SearchReq {
    modelNum: string;
    printCompanyName: string;
}

export type DiaryPrintFormSectionRef = {
    handleInit: () => void;
    refreshSearch: () => void;
};

interface Props {
    models: Model[];
    companies: CustomCompany[];
    searchFunc: (companyName?: string, modelNum?: string) => void;
}

const defaultForm: SearchReq = {
    modelNum: '',
    printCompanyName: '',
};

const DiaryPrintFormSection = forwardRef<DiaryPrintFormSectionRef, Props>(
    function DiaryPrintFormSection({ models, companies, searchFunc }, ref) {
    const [form, setForm] = useState<SearchReq>(defaultForm);
    const [modelNums, setModelNums] = useState<string[]>([]);
    const [companyNames, setCompanyNames] = useState<option[]>([]);

    useImperativeHandle(ref, () => ({
        handleInit: () => setForm(defaultForm),
        refreshSearch: () => searchFunc(form.printCompanyName, form.modelNum),
    }), [form.printCompanyName, form.modelNum, searchFunc]);

    useEffect(() => {
        setModelNums(models.map(m => m.modelNum));
    }, [models]);

    useEffect(() => {
        setCompanyNames([
            { value: "", label: "모두" },
            ...companies.map(c => ({ value: c.name, label: c.name }))
        ]);
    }, [companies]);

    useEffect(() => {
        searchFunc(form.printCompanyName, form.modelNum);
    }, [form.modelNum, form.printCompanyName, searchFunc]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-gray-200 rounded shadow max-w-xl mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="호수" children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange} 
                    options={modelNums.map(model => ({value: model, label: model}))} />
            } />
            <FormItem label="인쇄소명" children={
                <CommonSelect 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange} 
                    options={companyNames} 
                    />
            } />
        </div>
    );
});

export default DiaryPrintFormSection;
