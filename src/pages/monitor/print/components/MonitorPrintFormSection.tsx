import { forwardRef, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

export interface MonitorPrintStockRequest {
    paperCompanyName: string;
    printCompanyName: string;
    weight: string;
    properties: string;
    standard: string;
}

export interface MonitorPrintFormSectionRef {
    onInitForm: () => void;
}

interface Props {
    paperCompanies: CustomCompany[];
    printCompanies: CustomCompany[];
    papers: Paper[];
    isDetail: boolean;
    onSearch: (form: MonitorPrintStockRequest) => void;
    onDetailChange: (isDetail: boolean) => void;
}

const initForm: MonitorPrintStockRequest = {
    paperCompanyName: '',
    printCompanyName: '',
    weight: '',
    properties: '',
    standard: '',
};

const MonitorPrintFormSection = forwardRef<MonitorPrintFormSectionRef, Props>(
    function MonitorPrintFormSection({ paperCompanies, printCompanies, papers, isDetail, onSearch, onDetailChange }, ref) {
        const [form, setForm] = useState<MonitorPrintStockRequest>(initForm);

        useImperativeHandle(ref, () => ({
            onInitForm: () => {
                setForm(initForm);
                onSearch(initForm);
            },
        }), [onSearch]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
            const newForm = { ...form, [name]: value };
            setForm(newForm);
            onSearch(newForm);
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
            <div className="flex flex-col gap-2 p-4 bg-white rounded shadow mb-4 w-[70%]">
                <div className="grid grid-cols-3 gap-4">
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
                    <div className="flex items-center">
                        <label className="flex items-center gap-1 whitespace-nowrap text-sm cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isDetail}
                                onChange={e => onDetailChange(e.target.checked)}
                                className="h-4 w-4"
                            />
                            상세보기
                        </label>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <FormItem label="무게" children={
                        <CommonSelect
                            name="weight"
                            value={form.weight}
                            onChange={handleChange}
                            options={weightOptions}
                        />
                    } />
                    <FormItem label="지질" children={
                        <CommonSelect
                            name="properties"
                            value={form.properties}
                            onChange={handleChange}
                            options={propertiesOptions}
                        />
                    } />
                    <FormItem label="규격" children={
                        <CommonSelect
                            name="standard"
                            value={form.standard}
                            onChange={handleChange}
                            options={standardOptions}
                        />
                    } />
                </div>
            </div>
        );
    }
);

export default MonitorPrintFormSection;
