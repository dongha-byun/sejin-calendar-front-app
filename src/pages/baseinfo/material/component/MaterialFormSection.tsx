import React, { useState } from 'react';
import { BindMethod, type Material } from '../../../../types/baseinfo/Material';
import FormItem from '../../../../component/form/FormItem';
import FormRow from '../../../../component/form/FormRow';
import SelectText from '../../../../component/form/SelectText';
import { InputTextSize } from '../../../../component/form/InputText';

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
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-200 rounded shadow max-w-4xl mb-4">
            <FormRow>
                <FormItem label="분류" required children={
                    <SelectText options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
            </FormRow>
            <FormRow>
                <FormItem label="규격1" required children={
                    <SelectText options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
                <FormItem label="규격2" children={
                    <SelectText options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
            </FormRow>
            <FormRow>
                <FormItem label="내역" children={
                    <SelectText options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
                <FormItem label="색상" children={
                    <SelectText options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
            </FormRow>
            
            <div className="col-span-4 flex gap-2 justify-start mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}