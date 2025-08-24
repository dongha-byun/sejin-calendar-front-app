import { useEffect, useState } from "react";
import type { OrderMaterial } from "../../../../types/order/OrderMaterial";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { BindMethod, type Material } from "../../../../types/baseinfo/Material";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import { nowDate } from "../../../../utils/dateUtils";

interface Props {
    onAdd: (model: OrderMaterial) => void;
    selectedBindMethod: BindMethod;
    onChangeBindMethod: (type: BindMethod) => void;
    companies: CustomCompany[];
    materials: Material[];
}

export default function OrderMaterialFormSection({ onAdd, selectedBindMethod, onChangeBindMethod, companies, materials }: Props) {
    const [form, setForm] = useState<OrderMaterial>({
        statementNum: '',
        bindMethod: selectedBindMethod,
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: '',
        amount: 0,
        iDate: nowDate,
        demandDate: nowDate,
        etc: ''
    });

    const [standard1s, setStandard1s] = useState<string[]>([]);
    const [standard2s, setStandard2s] = useState<string[]>([]);
    const [contentList, setContentList] = useState<string[]>([]);
    const [colorList, setColorList] = useState<string[]>([]);

    useEffect(() => {
        setStandard1s(Array.from(new Set(materials.map(m => m.standard1))));
        setStandard2s([]);
        setContentList(Array.from(new Set(materials.map(m => m.contents))));
        setColorList(Array.from(new Set(materials.map(m => m.color))));
    }, [materials]);

    useEffect(() => {
        const filteredStandars2s = materials.filter(m => m.standard1 === form.standard1).map(m => m.standard2);
        setStandard2s(Array.from(new Set(filteredStandars2s)));
        setForm(prev => ({ ...prev, standard2: '' }));
    }, [form.standard1]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if(name === "bindMethod") {
            onChangeBindMethod(value as BindMethod);
        }
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    const onInit = () => {
        setForm(prev => ({
            ...prev,
            statementNum: '',
            companyName: '',
            standard1: '',
            standard2: '',
            contents: '',
            color: '',
            amount: 0,
            iDate: nowDate,
            demandDate: nowDate,
            etc: ''
        }));
    };

    const bindMethods = Object.values(BindMethod);
    const companyNames = companies.map(c => c.name);

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="분류" required children={
                <CommonSelect
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div className="text-right text-red-500">번호 </div>

            {/* 2행 */}
            <FormItem label="거래처" required children={
                <CommonSelect 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(name => ({ value: name, label: name }))} />
            } />
            <FormItem label="규격1" required children={
                <CommonSelect 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1s.map(standard1 => ({ value: standard1, label: standard1 }))} />
            } />
            <FormItem label="규격2" children={
                <CommonSelect 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard2s.map(standard2 => ({ value: standard2, label: standard2 }))} />
            } />
            

            {/* 3행 */}
            <FormItem label="내역" children={
                <CommonSelect 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={contentList.map(contents => ({ value: contents, label: contents }))} />
            } />
            <FormItem label="색상" children={
                <CommonSelect 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={colorList.map(color => ({ value: color, label: color }))} />
            } />
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
            <FormItem label="발주일자" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <FormItem label="납품요구일" children={
                <InputText 
                    name="demandDate"
                    value={form.demandDate}
                    onChange={handleChange} />
            } />
            <div />

            {/* 5행 */}
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