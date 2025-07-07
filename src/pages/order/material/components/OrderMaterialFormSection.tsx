import { useState } from "react";
import type { OrderMaterial } from "../../../../types/order/OrderMaterial";

interface Props {
    onAdd: (model: OrderMaterial) => void;
}

export default function OrderMaterialFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<OrderMaterial>({
        statementNum: '',
        bindMethod: '',
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: '',
        amount: 0,
        iDate: '',
        demandDate: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {

        const newModel: OrderMaterial = {
            ...form,
            id: Date.now()
        };
        onAdd(newModel);
        setForm({ ...form, statementNum: '', bindMethod: '', companyName: '', standard1: '', standard2: '', contents: '', color: '', amount: 0, iDate: '', demandDate: '', etc: '' });
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
            <div>
                <label>분류 *</label>
                <input name="bindMethod" value={form.bindMethod} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>거래처 *</label>
                <input name="companyName" value={form.companyName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>규격1 *</label>
                <input name="standard1" value={form.standard1} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>규격2</label>
                <input name="standard2" value={form.standard2} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>내역</label>
                <input name="contents" value={form.contents} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>색상</label>
                <input name="color" value={form.color} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>발주일자</label>
                <input name="iDate" value={form.iDate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>납품요구일</label>
                <input name="demandDate" value={form.demandDate} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>비고</label>
                <input name="etc" value={form.etc} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>

            <div className="col-span-4 flex gap-2 justify-end mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}