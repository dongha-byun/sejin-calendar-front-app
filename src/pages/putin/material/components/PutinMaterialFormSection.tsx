import { useState } from "react";
import type { PutinMaterial } from "../../../../types/putin/PutinMaterial";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface Props {
    onAdd: (putinMaterial: PutinMaterial) => void;
}

export default function PutinMaterialFormSection({ onAdd }: Props) {

    const [form, setForm] = useState<PutinMaterial>({
        id: 0,
        bindMethod: '',
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: '',
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
    
        const newPutinMaterial: PutinMaterial = {
            ...form,
            id: Date.now()
        };
        onAdd(newPutinMaterial);
        setForm({
            id: 0,
            bindMethod: '',
            companyName: '',
            standard1: '',
            standard2: '',
            contents: '',
            color: '',
            amount: 0,
            pricePer: 0,
            price: 0,
            iDate: '',
            approval: '',
            etc: ''
        });
    };

    const bindMethods = [
        "아르떼", "ART", "판지", "S/W", "미색모조", 
        "르느와르", "등등"
    ];

    const companyNames = [
        "삼성", "LG", "SK", "현대", "기아"
    ];

    const standard1 = [
        "200-300", "788-1091", "880-625", "636-939", "720-590",
    ];

    const standard2 = [
        "1091-788", "625-880", "939-636", "590-720", "등등"
    ];

    const contents = [
        "내역1", "내역2", "내역3", "내역4", "내역5"
    ];

    const colors = [
        "빨강", "파랑", "초록", "노랑", "검정", "흰색"
    ];

    const approvals = [
        "청구 미", "청구", "결재"
    ]

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="분류" required children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="거래처" children={
                <SelectText 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격1" children={
                <SelectText 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격2" children={
                <SelectText 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard2.map(method => ({ value: method, label: method }))} />
            } />

            {/* 3행 */}
            <FormItem label="내역" children={
                <SelectText 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={contents.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="색상" children={
                <SelectText 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={colors.map(method => ({ value: method, label: method }))} />
            } />
            <div />

            {/* 4행 */}
            <FormItem label="수량" children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} />
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

            {/* 5행 */}
            <FormItem label="발주일자" children={
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