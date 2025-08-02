import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";
import type { DiaryMachine } from "../../../../types/diary/DiaryMachine";

interface Props {
    onAdd: (diaryMachine: DiaryMachine) => void;
}

export default function DiaryMachineFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<DiaryMachine>({
        id: 0,
        machineNum: '',
        modelNum: '',
        modelName: '',
        amount: 0,
        printCn: '',
        iDate: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newDiaryMachine: DiaryMachine = {
            ...form,
            id: Date.now()
        };
        onAdd(newDiaryMachine);
        setForm({
            id: 0,
            machineNum: '',
            modelNum: '',
            modelName: '',
            amount: 0,
            printCn: '',
            iDate: '',
            etc: ''
        });
    };

    const machines = [
        "1호기", "2호기", "3호기", "4호기", "5호기"
    ];

    const models = [
        "모델A", "모델B", "모델C", "모델D", "모델E"
    ];

    const printCns = [
        "상호A", "상호B", "상호C", "상호D", "상호E"
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="기계" required children={
                <SelectText 
                    name="machineNum"
                    value={form.machineNum}
                    onChange={handleChange}
                    options={machines.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="작업일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
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
                        options={printCns.map(method => ({ value: method, label: method }))} />
                } />
            </div>

            {/* 4행 */}
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
            <div className="items-center flex gap-2">
                <span>정합가능량 : </span>
            </div>
        </div>
    );
}