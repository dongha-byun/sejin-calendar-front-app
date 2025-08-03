import { useState } from "react";
import type { DiaryBind } from "../../../../types/diary/DiaryBind";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

interface Props {
    onAdd: (diaryBind: DiaryBind) => void;
}

export default function DiaryBindFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<DiaryBind>({
        id: 0,
        bindCompanyName: '',
        bindMethod: '',
        modelNum: '',
        modelName: '',
        amount: 0,
        printCn: '',
        iDate: '',
        price: 0,
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newDiaryBind: DiaryBind = {
            ...form,
            id: Date.now()
        };
        onAdd(newDiaryBind);
        setForm({
            id: 0,
            bindCompanyName: '',
            bindMethod: '',
            modelNum: '',
            modelName: '',
            amount: 0,
            printCn: '',
            iDate: '',
            price: 0,
            etc: ''
        });
    };

    const companyNames = [
        "삼성", "LG", "SK", "현대", "기아"
    ];

    const bindMethods = [
        "에구다1", "에구다2", "금박1", "금박2",
        "마스터", "TWIN아스테지"
    ];

    const models = [
        "모델 A", "모델 B", "모델 C", "모델 D"
    ];

    const printCns = [
        "상호A", "상호B", "상호C", "상호D", "상호E"
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="제본소명" required children={
                <SelectText 
                    name="bindCompanyName"
                    value={form.bindCompanyName}
                    onChange={handleChange} 
                    options={companyNames.map(method => ({ value: method, label: method }))}/>
            } />
            <FormItem label="제본방식" required children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="모델" required children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={models.map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="모델명" children={
                <InputText 
                    name="modelName"
                    value={form.modelName}
                    onChange={handleChange} />
            } />
            </div>

            {/* 3행 */}
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="상호" required children={
                    <SelectText 
                        name="printCn"
                        value={form.printCn}
                        onChange={handleChange} 
                        options={printCns.map(cn => ({ value: cn, label: cn }))}/>
            } />
            </div>

            {/* 4행 */}
            <FormItem label="작업일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <FormItem label="금액" children={
                <InputText 
                    name="price"
                    value={form.price}
                    onChange={handleChange} />
            } />
            <div className="flex gap-2 items-center">
                <span>단가기준 : </span>
            </div>

            {/* 5행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="비고" children={
                    <InputText 
                        name="etc"
                        value={form.etc}
                        onChange={handleChange} />
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
            </div>
        </div>
    );
}