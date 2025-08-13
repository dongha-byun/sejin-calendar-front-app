import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { AdminAuth } from "../../../../types/admin/AdminAuth";

interface Props {
  onAdd: (adminAuth: AdminAuth) => void;
}

export default function AdminRuleFormSection({onAdd}: Props) {
    const [form, setForm] = useState<AdminAuth>({
        authMenuId: '',
        name: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onAdd(form);
        setForm({ 
            ...form, 
            authMenuId: '',
            name: '',
            etc: '' 
        });
    };

    return (
        <div className="grid gap-4 p-4 bg-gray-200 rounded shadow max-w-4xl mb-4">
            <div className="mt-2 flex items-center text-sm gap-3">
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">신규룰 추가</button>
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">룰 수정</button>
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">룰 삭제</button>
            </div>
            <FormItem label="룰ID" required children={
                <InputText 
                    name="authMenuId"
                    value={form.authMenuId}
                    onChange={handleChange} />
            } />
            <FormItem label="룰이름" required children={
                <InputText 
                    name="name"
                    value={form.name}
                    onChange={handleChange} />
            } />
            <FormItem label="ETC" children={
                <InputText 
                    name="etc"
                    value={form.etc}
                    onChange={handleChange} />
            } />
            <div className="mt-2 flex justify-end items-center text-sm gap-3">
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">룰등록 완료</button>
            </div>
        </div>
    );
}