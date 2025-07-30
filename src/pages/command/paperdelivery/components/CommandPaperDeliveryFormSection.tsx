import { useState } from "react";
import type { CommandPaperDelivery } from "../../../../types/command/CommandPaperDelivery";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface Props {
    onAdd: (commandPaperDelivery: CommandPaperDelivery) => void;
}

export default function CommandPaperDeliveryFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<CommandPaperDelivery>({
        id: 0,
        paperCompanyName: '',
        printCompanyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: 0,
        iDate: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newCommandPaperDelivery: CommandPaperDelivery = {
            ...form,
            id: Date.now()
        };
        onAdd(newCommandPaperDelivery);
        setForm({
            id: 0,
            paperCompanyName: '',
            printCompanyName: '',
            weight: 0,
            properties: '',
            standard: '',
            amount: 0,
            iDate: '',
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

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="지업사명" required children={
                <SelectText 
                    name="paperCompanyName"
                    value={form.paperCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="인쇄소명" required children={
                <SelectText 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="무게" required children={
                <SelectText 
                    name="weight"
                    value={form.weight}
                    onChange={handleChange}
                    options={weights.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="지질" required children={
                <SelectText 
                    name="properties"
                    value={form.properties}
                    onChange={handleChange}
                    options={propertiesOptions.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="규격" required children={
                <SelectText 
                    name="standard"
                    value={form.standard}
                    onChange={handleChange}
                    options={standardOptions.map(method => ({ value: method, label: method }))} />
            } />

            {/* 3행 */}
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <div />
            <FormItem label="지시일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
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