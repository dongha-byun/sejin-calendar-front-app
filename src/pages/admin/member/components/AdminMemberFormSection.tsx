import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { AdminMember } from "../../../../types/admin/AdminMember";

interface Props {
    onAdd: (adminMember: AdminMember) => void;
    selectedMember: AdminMember | undefined;
    deleteMember: (userId: string) => void;
}

const initForm: AdminMember = {
    userId: '',
    password: '',
    companyName: '',
    name: '',
    address: '',
    tel: '',
    email: '',
    etc: ''
}

export default function AdminMemberFormSection({ onAdd, selectedMember, deleteMember }: Props) {
    const [isNewMode, setIsNewMode] = useState<boolean>(false);    
    const [form, setForm] = useState<AdminMember>(initForm);

    useEffect(() => {
        if(selectedMember) {
            setForm(selectedMember);
            setIsNewMode(false);
        }
    }, [selectedMember]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onAdd(form);
        setForm(initForm);
        setIsNewMode(true);
    };

    const changeNewMode = () => {
        setIsNewMode(true);
        setForm(initForm);
    }

    const onDelete = () => {
        deleteMember(form.userId);
        setForm(initForm);
        setIsNewMode(false);
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
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="Password" required children={
                <InputText 
                    name="password"
                    value={form.password}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="이름" required children={
                <InputText 
                    name="name"
                    value={form.name}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="주소" children={
                <InputText 
                    name="addr1"
                    value={form.address}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="전화" children={
                <InputText 
                    name="tel1"
                    value={form.tel}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="e-mail" children={
                <InputText 
                    name="email"
                    value={form.email}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <FormItem label="기타" children={
                <InputText 
                    name="etc"
                    value={form.etc}
                    readOnly={!isNewMode}
                    onChange={handleChange} />
            } />
            <div className="flex items-center text-sm gap-3">
                <button onClick={onDelete} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택삭제</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">저장</button>
            </div>
        </div>
    );
}