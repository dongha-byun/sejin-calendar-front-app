import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { EtcSampleDto } from "../../../../types/etc/EtcSample";
import type { Model } from "../../../../types/baseinfo/Model";
import { nowDate } from "../../../../utils/dateUtils";

type FormState = Omit<EtcSampleDto, 'amount'> & { amount: string };

interface Props {
    onAdd: (data: EtcSampleDto) => void;
    models: Model[];
}

const defaultForm: FormState = {
    modelNum: '',
    modelName: '',
    orderDate: nowDate,
    amount: '',
    etc: '',
};

export default function EtcSampleFormSection({ onAdd, models }: Props) {
    const [form, setForm] = useState<FormState>(defaultForm);

    const modelNums = models.map(model => model.modelNum);

    useEffect(() => {
        const model = models.find(m => m.modelNum === form.modelNum);
        setForm(prev => ({
            ...prev,
            modelName: model?.modelName || '',
        }));
    }, [form.modelNum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'amount') {
            if (value === '' || /^[1-9]\d*$/.test(value)) {
                setForm(prev => ({ ...prev, amount: value }));
            }
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm(defaultForm);
    };

    const handleSubmit = () => {
        onAdd({ ...form, amount: parseInt(form.amount, 10) || 0 });
        onInit();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행: 모델 + 모델명 */}
            <FormItem label="모델" required children={
                <CommonSelect
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums.map(m => ({ value: m, label: m }))}
                    isFilterStartWith
                />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="모델명" children={
                    <InputText
                        name="modelName"
                        value={form.modelName}
                        onChange={handleChange}
                        readOnly
                    />
                } />
            </div>

            {/* 2행: 수량 */}
            <FormItem label="수량" required children={
                <InputText
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                />
            } />
            <div />
            <div />

            {/* 3행: 비고 */}
            <div className="col-span-3">
                <FormItem label="비고" children={
                    <InputText
                        name="etc"
                        value={form.etc}
                        onChange={handleChange}
                    />
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}
