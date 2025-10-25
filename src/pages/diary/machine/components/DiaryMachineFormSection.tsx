import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";
import type { DiaryMachine } from "../../../../types/diary/DiaryMachine";
import type { Model } from "../../../../types/baseinfo/Model";
import { nowDate } from "../../../../utils/dateUtils";
import CommonSelect from "../../../../component/form/CommonSelect";

interface Props {
    onAdd: (diaryMachine: DiaryMachine) => void;
    models: Model[];
    onChangeModel: (modelNum: string) => void;
    printCnList: string[];
    combinableQuantity: number;
}

const machines = ["1호기", "2호기", "3호기", "기타"]; 

export default function DiaryMachineFormSection({ onAdd, models, onChangeModel, printCnList, combinableQuantity }: Props) {
    const [form, setForm] = useState<DiaryMachine>({
        machineNum: '',
        modelNum: '',
        modelName: '',
        amount: 0,
        printCn: '',
        iDate: nowDate,
        etc: ''
    });

    useEffect(() => {
        const selectedModel = models.find(model => model.modelNum === form.modelNum);
        if (selectedModel) {
            setForm(prev => ({ ...prev, modelName: selectedModel.modelName }));
        }

        // 상위 컴포넌트에서 상호명 재조회 처리
        onChangeModel(form.modelNum);
    }, [form.modelNum]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (form.amount < 1) {
            alert("수량은 1 이상이어야 합니다.");
            return;
        }

        if (form.amount > combinableQuantity) {
            alert("수량이 정합 가능량을 초과할 수 없습니다.");
            return;
        }

        onAdd(form);
        setForm({
            machineNum: '',
            modelNum: '',
            modelName: '',
            amount: 0,
            printCn: '',
            iDate: nowDate,
            etc: ''
        });
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="기계" required children={
                <CommonSelect 
                    name="machineNum"
                    value={form.machineNum}
                    onChange={handleChange}
                    options={machines.map(machine => ({ value: machine, label: machine }))} />
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
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={models.map(model => ({ value: model.modelNum, label: model.modelNum }))} />
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
                        options={printCnList.map(printCn => ({ value: printCn, label: printCn }))} />
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
                <span>정합가능량 : {combinableQuantity}</span>
            </div>
        </div>
    );
}