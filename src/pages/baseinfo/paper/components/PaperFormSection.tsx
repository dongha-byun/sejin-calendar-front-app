import { useEffect, useState } from "react";
import type { Paper } from "../../../../types/baseinfo/Paper";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

interface Props {
    onAdd: (paper: Paper) => void;
    list: Paper[];
}

const defaultPropertiesList = ["ART", "S/W", "모조"];
const defaultStandardList = ["636-939", "939-636", "788-1091", "1091-788"];

export default function PaperFormSection({ onAdd, list }: Props) {
    const [propertiesList, setPropertiesList] = useState<string[]>(defaultPropertiesList);
    const [standardList, setStandardList] = useState<string[]>(defaultStandardList);

    const [form, setForm] = useState<Paper>({
        weight: 0,
        properties: '',
        standard: ''
    });

    useEffect(() => {
        // 1. list 에서 properties 추출 + default 까지 합쳐서 중복 없이
        const uniqueProperties = Array.from(new Set(list.map(p => p.properties).concat(defaultPropertiesList)));
        setPropertiesList(uniqueProperties);

        // 2. list 에서 standard 추출 + default 까지 합쳐서 중복 없이
        const uniqueStandards = Array.from(new Set(list.map(p => p.standard).concat(defaultStandardList)));
        setStandardList(uniqueStandards);

        onInit();

    }, [list]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onAdd(form);
    };

    const onInit = () => {
        setForm({ weight: 0, properties: '', standard: '' });
    }

    return (
        <div className="grid grid-cols-2 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[30vw]">
            {/* 1행 */}
            <FormItem label="무게" required children={
                <InputText name="weight" value={form.weight} onChange={handleChange} unitText="g" />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="지질" required children={
                <SelectText 
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={propertiesList.map(c => ({ value: c, label: c }))} />
            } />
            <div />

            {/* 3행 */}
            <FormItem label="규격" required children={
                <SelectText 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standardList.map(c => ({ value: c, label: c }))} />
            } />
            <div />

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}