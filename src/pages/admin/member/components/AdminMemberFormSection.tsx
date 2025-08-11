import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { AdminMember } from "../../../../types/admin/AdminMember";

interface Props {
    onAdd: (adminMember: AdminMember) => void;
}

export default function AdminMemberFormSection({ onAdd }: Props) {

    const [form, setForm] = useState<AdminMember>({
        id: 0,
        userId: '',
        password: '',
        companyName: '',
        name: '',
        addr1: '',
        tel1: '',
        fax1: '',
        email: '',
        webhard: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newAdminMember: AdminMember = {
            ...form,
            id: Date.now()
        };
        onAdd(newAdminMember);
        setForm({
            id: 0,
            userId: '',
            password: '',
            companyName: '',
            name: '',
            addr1: '',
            tel1: '',
            fax1: '',
            email: '',
            webhard: '',
            etc: ''
        });
    };

    const changeNewMode = () => {
        console.log("신규추가 버튼 호출");
    }

    const onDelete = () => {
        console.log("선택삭제 버튼 호출");
    }

    return (
        <div className="grid grid-cols-1 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            <div className="flex justify-end text-sm gap-3">
                <button onClick={changeNewMode} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">신규추가</button>
            </div>
            <FormItem label="ID" required children={
                <InputText 
                    name="userId"
                    value={form.userId}
                    onChange={handleChange} />
            } />
            <FormItem label="Password" required children={
                <InputText 
                    name="password"
                    value={form.password}
                    onChange={handleChange} />
            } />
            <FormItem label="이름" required children={
                <InputText 
                    name="name"
                    value={form.name}
                    onChange={handleChange} />
            } />
            <FormItem label="주소" children={
                <InputText 
                    name="addr1"
                    value={form.addr1}
                    onChange={handleChange} />
            } />
            <FormItem label="전화" children={
                <InputText 
                    name="tel1"
                    value={form.tel1}
                    onChange={handleChange} />
            } />
            <FormItem label="e-mail" children={
                <InputText 
                    name="email"
                    value={form.email}
                    onChange={handleChange} />
            } />
            <FormItem label="기타" children={
                <InputText 
                    name="etc"
                    value={form.etc}
                    onChange={handleChange} />
            } />
            <div className="flex items-center text-sm gap-3">
                <button onClick={onDelete} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">저장</button>
            </div>
        </div>
    );
}