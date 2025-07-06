import { useState } from "react";
import type { Paper } from "../../../../types/baseinfo/Paper";

interface Props {
    onAdd: (paper: Paper) => void;
}

export default function PaperFormSection({ onAdd }: Props) {

    const [form, setForm] = useState<Paper>({
        weight: 0,
        properties: '',
        standard: '',
        createdAt: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        
        const newPaper: Paper = {
            ...form,
            id: Date.now()
        };
        onAdd(newPaper);
        setForm({ ...form, weight: 0, properties: '', standard: '', createdAt: new Date().toISOString().split('T')[0] });
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
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
            
            <div className="col-span-4 flex gap-2 justify-end mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}