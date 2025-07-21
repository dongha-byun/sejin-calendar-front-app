import { useState } from "react";
import type { Paper } from "../../../../types/baseinfo/Paper";
import FormRow from "../../../../component/form/FormRow";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

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

    const propertiesOptions = [
        "아르떼", "ART", "판지", "S/W", "미색모조", 
        "르느와르", "등등"
    ];

    const standardOptions = [
        "200-300", "788-1091", "880-625", "636-939", "720-590",
        "1091-788", "625-880", "939-636", "590-720", "등등"
    ];

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
        <div className="min-w-[500px] max-w-[50vw] w-full grid grid-cols-2 gap-4 border p-4 mb-4">
            <div className="flex flex-col gap-2">
                <FormRow>
                    <FormItem label="무게" required children={
                        <InputText name="weight" value={form.weight} onChange={handleChange} />
                    } />g
                </FormRow>
                <FormRow>
                    <FormItem label="지질" required children={
                        <SelectText options={propertiesOptions.map(c => ({ value: c, label: c }))} />
                    } />
                </FormRow>
                <FormRow>
                    <FormItem label="규격" required children={
                        <SelectText options={standardOptions.map(c => ({ value: c, label: c }))} />
                    } />
                </FormRow>
                <div className="flex gap-2 mt-2">
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
                </div>
            </div>
        </div>
    );
}