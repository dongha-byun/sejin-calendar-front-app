import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { CommandBindDto } from "../../../../types/command/CommandBind";
import { nowDate } from "../../../../utils/dateUtils";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Model } from "../../../../types/baseinfo/Model";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    onAdd: (commandBind: CommandBindDto) => void;
    bindCompanies: CustomCompany[];
    printCompanies: CustomCompany[];
    models: Model[];
}

const defaultBindCompany = "SEJIN";

export default function CommandBindFormSection({ onAdd, bindCompanies, printCompanies, models }: Props) {
    const [form, setForm] = useState<CommandBindDto>({
        bindCompanyName: defaultBindCompany,
        modelNum: '',
        modelName: '',
        bindMethod: '',
        amount: "0",
        printCompanyName: '',
        iDate: nowDate,
        contents: '',
        etc: ''
    });
    
    const modelNums = models.map(model => model.modelNum);
    const bindCompanyNames = bindCompanies.map(c => c.name);
    const printCompanyNames = printCompanies.map(c => c.name);
    const bindMethods = makeDistinctArray(models.map(m => m.bindMethod));

    useEffect(() => {
        const model = models.find(m => m.modelNum === form.modelNum);
        setForm((prev) => ({
            ...prev,
            modelName: model?.modelName || "",
            bindMethod: model?.bindMethod || ""
        }));
    }, [form.modelNum]);

    const onInit = () => {
        setForm({
            bindCompanyName: defaultBindCompany,
            modelNum: '',
            modelName: '',
            bindMethod: '',
            amount: "0",
            printCompanyName: '',
            iDate: nowDate,
            contents: '',
            etc: ''
        });
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="제본소명" required children={
                <CommonSelect 
                    name="bindCompanyName"
                    value={form.bindCompanyName}
                    onChange={handleChange}
                    options={bindCompanyNames.map(method => ({ value: method, label: method }))} 
                    defaultOption={[defaultBindCompany]}/>
            } />
            <div />
            <FormItem label="인쇄소명" required children={
                <CommonSelect 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={printCompanyNames.map(method => ({ value: method, label: method }))} />
            } />

            {/* 2행 */}
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
                        onChange={handleChange} />
                } />
            </div>

            {/* 3행 */}
            <FormItem label="제본방식" children={
                <CommonSelect 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="수량" required children={
                <InputText 
                    name="amount"
                    value={formatNumber(form.amount)}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="지시일" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />

            {/* 4행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="지시내용" children={
                    <InputText 
                        name="contents"
                        value={form.contents}
                        onChange={handleChange} />
                } />
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
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}