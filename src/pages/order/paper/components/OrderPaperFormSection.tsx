import { useState } from "react";
import type { OrderPaper } from "../../../../types/order/OrderPaper";

interface Props {
    onAdd: (orderPaper: OrderPaper) => void;
}

export default function OrderPaperFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<OrderPaper>({
        statementNum: '',
        companyName: '',
        weight: 0,
        properties: '',
        standard: '',
        amount: 0,
        iDate: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {

        const newModel: OrderPaper = {
            ...form,
            id: Date.now()
        };
        onAdd(newModel);
        setForm({ ...form, statementNum: '', companyName: '', weight: 0, properties: '', standard: '', amount: 0, iDate: '', etc: '' });
    };    

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
            <div>
                <label>지업사명 *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>무게 *</label>
                <input name="weight" value={form.weight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>지질 *</label>
                <input name="properties" value={form.properties} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>규격 *</label>
                <input name="standard" value={form.standard} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>수량 *</label>
                <input name="amount" value={form.amount} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>주문일 *</label>
                <input name="iDate" value={form.iDate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>비고 *</label>
                <input name="etc" value={form.etc} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>

            <div className="col-span-4 flex gap-2 justify-end mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}