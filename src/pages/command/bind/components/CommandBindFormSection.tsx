import { useState } from "react";

import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";
import type { CommandBind } from "../../../../types/command/CommandBind";

interface Props {
    onAdd: (commandBind: CommandBind) => void;
}

export default function CommandBindFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<CommandBind>({
        id: 0,
        bindCompanyName: '',
        modelNum: '',
        modelName: '',
        bindMethod: '',
        amount: 0,
        printCompanyName: '',
        iDate: '',
        contents: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newCommandBind: CommandBind = {
            ...form,
            id: Date.now()
        };
        onAdd(newCommandBind);
        setForm({
            id: 0,
            bindCompanyName: '',
            modelNum: '',
            modelName: '',
            bindMethod: '',
            amount: 0,
            printCompanyName: '',
            iDate: '',
            contents: '',
            etc: ''
        });
    };

    const companyNames = [
        "삼성", "LG", "SK", "현대", "기아"
    ];

    const weights = [
        70, 80, 90, 100, 120
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="제본소명" required children={
                <SelectText 
                    name="bindCompanyName"
                    value={form.bindCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <FormItem label="인쇄소명" required children={
                <SelectText 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />

            {/* 2행 */}
            <FormItem label="모델" required children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={weights.map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="모델명" children={
                    <InputText 
                        name="modelName"
                        value={form.modelName}
                        onChange={handleChange} />
                } />
            </div>

            {/* 3행 */}
            <FormItem label="제본방식" children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={weights.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="지시일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="지시내용" children={
                    <InputText 
                        name="contents"
                        value={form.contents}
                        onChange={handleChange} />
                } />
            </div>

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
            </div>
        </div>
    );
}