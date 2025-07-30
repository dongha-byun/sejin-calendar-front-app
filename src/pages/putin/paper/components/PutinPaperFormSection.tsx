import { useState } from "react";
import type { PutinPaper } from "../../../../types/putin/PutinPaper";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface Props {
    onAdd: (putinPaper: PutinPaper) => void;
}

export default function PutinPaperFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<PutinPaper>({
        id: 0,
        companyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: 0,
        pricePer: 0,
        price: 0,
        iDate: '',
        approval: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
    
        const newPutinMaterial: PutinPaper = {
            ...form,
            id: Date.now()
        };
        onAdd(newPutinMaterial);
        setForm({
            id: 0,
            companyName: '',
            weight: 0,
            properties: '',
            standard: '',
            amount: 0,
            pricePer: 0,
            price: 0,
            iDate: '',
            approval: '',
            etc: ''
        });
    };

    const companyNames = [
        "삼성", "LG", "SK", "현대", "기아"
    ];

    const weights = [
        70, 80, 90, 100, 120
    ];

    const propertiesOptions = [
        "아르떼", "ART", "판지", "S/W", "미색모조", 
        "르느와르", "등등"
    ];

    const standardOptions = [
        "200-300", "788-1091", "880-625", "636-939", "720-590",
        "1091-788", "625-880", "939-636", "590-720", "등등"
    ];

    const approvals = [
        "청구 미", "청구", "결재"
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="지업사명" required children={
                <SelectText 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />

            {/* 2행 */}
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
                    options={propertiesOptions.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격" children={
                <SelectText 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standardOptions.map(method => ({ value: method, label: method }))} />
            } />

            {/* 3행 */}
            <FormItem label="수량" children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="단가" children={
                <InputText 
                    name="pricePer"
                    value={form.pricePer}
                    onChange={handleChange} />
            } />
            <FormItem label="금액" children={
                <InputText 
                    name="price"
                    value={form.price}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
            <FormItem label="입고일" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <div />
            <FormItem label="결제" children={
                <SelectText 
                    name="approval"
                    value={form.approval}
                    onChange={handleChange}
                    options={approvals.map(method => ({ value: method, label: method }))} />
            } />
            
            {/* 6행 */}
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
            </div>
        </div>
    );
}
