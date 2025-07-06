import React, { useState } from 'react';
import { BindMethod, type Material } from '../../../../types/baseinfo/Material';

const bindMethods: BindMethod[] = [
    BindMethod.IRON,
    BindMethod.HOLDER, 
    BindMethod.ACTATE,
    BindMethod.TWIN,
    BindMethod.BIG_PAPER,
    BindMethod.BOX,
    BindMethod.SACK,
    BindMethod.HALF_MOON,
    BindMethod.VINYL
];

interface Props {
    onAdd: (material: Material) => void;
}

export default function MaterialFormSection({ onAdd }: Props) {

    const [form, setForm] = useState<Material>({
        bindMethod: BindMethod.IRON,
        standard1: '',
        standard2: '',
        contents: '',
        color: '', 
        createdAt: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
    
        const newMaterial: Material = {
          ...form,
          id: Date.now()
        };
        onAdd(newMaterial);
        setForm({ ...form, bindMethod: BindMethod.IRON, standard1: '', standard2: '', contents: '', color: '', createdAt: new Date().toISOString().split('T')[0] });
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
            <div>
                <label>분류 *</label>
                <select name="bindMethod" value={form.bindMethod} onChange={handleChange} className="w-full border rounded px-2 py-1">
                {bindMethods.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
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
            
            <div className="col-span-4 flex gap-2 justify-end mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}