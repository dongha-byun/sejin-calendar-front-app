import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";

interface SearchReq {
    orderNum: number;
    amount: number;
    iDate: string;
}

export default function DiaryOrderOutFormSection() {
    const [form, setForm] = useState<SearchReq>({
        orderNum: 0,
        amount: 0,
        iDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-200 rounded shadow max-w-[50vw] mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="접수번호" children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange}  />
            } />
            <FormItem label="부수" children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} />
            } />
            <FormItem label="날짜" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
        </div>
    );
}