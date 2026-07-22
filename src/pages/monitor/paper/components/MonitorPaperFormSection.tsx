import { forwardRef, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

export interface MonitorPaperStockRequest {
    paperCompanyName: string;
    printCompanyName: string;
}

export interface MonitorPaperFormSectionRef {
    onInitForm: () => void;
}

interface Props {
    paperCompanies: CustomCompany[];
    printCompanies: CustomCompany[];
    papers: Paper[];
    onSearch: (form: MonitorPaperStockRequest) => void;
}

const initForm: MonitorPaperStockRequest = {
    paperCompanyName: '',
    printCompanyName: '',
};

const MonitorPaperFormSection = forwardRef<MonitorPaperFormSectionRef, Props>(
    function MonitorPaperFormSection({ paperCompanies, printCompanies, papers, onSearch }, ref) {
        const [form, setForm] = useState<MonitorPaperStockRequest>(initForm);

        useImperativeHandle(ref, () => ({
            onInitForm: () => {
                setForm(initForm);
                onSearch(initForm);
            },
        }), [onSearch]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            setForm(prev => ({ ...prev, [name]: value }));
        };

        const paperCompanyOptions = [
            { value: '', label: '모두' },
            ...makeDistinctArray(paperCompanies.map(c => c.name)).map(n => ({ value: n, label: n })),
        ];

        const printCompanyOptions = [
            { value: '', label: '모두' },
            ...makeDistinctArray(printCompanies.map(c => c.name)).map(n => ({ value: n, label: n })),
        ];

        const weightOptions = [
            { value: '', label: '모두' },
            ...makeDistinctArray(papers.map(p => String(p.weight))).map(w => ({ value: w, label: w })),
        ];

        const propertiesOptions = [
            { value: '', label: '모두' },
            ...makeDistinctArray(papers.map(p => p.properties)).map(v => ({ value: v, label: v })),
        ];

        const standardOptions = [
            { value: '', label: '모두' },
            ...makeDistinctArray(papers.map(p => p.standard)).map(v => ({ value: v, label: v })),
        ];

        return (
            <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
                <FormItem label="지업사" children={
                    <CommonSelect
                        name="paperCompanyName"
                        value={form.paperCompanyName}
                        onChange={handleChange}
                        options={paperCompanyOptions}
                    />
                } />
                <FormItem label="인쇄소" children={
                    <CommonSelect
                        name="printCompanyName"
                        value={form.printCompanyName}
                        onChange={handleChange}
                        options={printCompanyOptions}
                    />
                } />
                <FormItem label="무게" children={
                    <CommonSelect
                        name="weight"
                        value={''}
                        onChange={() => {}}
                        options={weightOptions}
                    />
                } />
                <FormItem label="지질" children={
                    <CommonSelect
                        name="properties"
                        value={''}
                        onChange={() => {}}
                        options={propertiesOptions}
                    />
                } />
                <FormItem label="규격" children={
                    <CommonSelect
                        name="standard"
                        value={''}
                        onChange={() => {}}
                        options={standardOptions}
                    />
                } />
                <div className="flex items-end">
                    <button
                        onClick={() => onSearch(form)}
                        className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                        조회
                    </button>
                </div>
            </div>
        );
    }
);

export default MonitorPaperFormSection;
