import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import { BindMethod, type Material } from "../../../../types/baseinfo/Material";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

export interface MonitorMaterialSearchRequest {
    bindMethod: string;
    companyName: string;
    standard1: string;
    standard2: string;
    contents: string;
    color: string;
}

interface Props {
    companies: CustomCompany[];
    materials: Material[];
    onSearch: (form: MonitorMaterialSearchRequest) => void;
    isDetailView: boolean;
    onDetailViewChange: (isDetailView: boolean) => void;
}

export default function MonitorMaterialFormSection({ companies, materials, onSearch, isDetailView, onDetailViewChange }: Props) {
    const [form, setForm] = useState<MonitorMaterialSearchRequest>({
        bindMethod: BindMethod.IRON,
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: ''
    });

    useEffect(() => {
        onSearch(form);
    }, [form]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name } = e.target;
        const value = e.target.value;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const uniqueCompanyNames = makeDistinctArray(companies.map(c => c.name));
    const companyNameOptions = [{ value: '', label: '모두' }, ...uniqueCompanyNames.map(name => ({ value: name, label: name }))];

    const uniqueStandard1s = makeDistinctArray(materials.map(m => m.standard1));
    const standard1Options = [{ value: '', label: '모두' }, ...uniqueStandard1s.map(standard1 => ({ value: standard1, label: standard1 }))];

    const uniqueStandard2s = makeDistinctArray(materials.map(m => m.standard2));
    const standard2Options = [{ value: '', label: '모두' }, ...uniqueStandard2s.map(standard2 => ({ value: standard2, label: standard2 }))];

    const uniqueContents = makeDistinctArray(materials.map(m => m.contents));
    const contentsOptions = [{ value: '', label: '모두' }, ...uniqueContents.map(contents => ({ value: contents, label: contents }))];

    const uniqueColors = makeDistinctArray(materials.map(m => m.color));
    const colorOptions = [{ value: '', label: '모두' }, ...uniqueColors.map(color => ({ value: color, label: color }))];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="분류" children={
                <CommonSelect 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={Object.values(BindMethod).map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2">
                <FormItem label="거래처" children={
                    <CommonSelect 
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        options={companyNameOptions} />
                } />
            </div>
            <FormItem label="상세보기" children={
                <input type="checkbox" name="isDetailView" checked={isDetailView} onChange={() => onDetailViewChange(!isDetailView)} />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="규격1" children={
                <CommonSelect 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1Options} />
            } />
            <FormItem label="규격2" children={
                <CommonSelect 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard2Options} />
            } />
            <FormItem label="내역" children={
                <CommonSelect 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={contentsOptions} />
            } />
            <FormItem label="색상" children={
                <CommonSelect 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={colorOptions} />
            } />
            
        </div>
    );
};
