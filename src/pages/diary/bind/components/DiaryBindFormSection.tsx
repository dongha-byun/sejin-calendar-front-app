import { useEffect, useState } from "react";
import type { DiaryBind } from "../../../../types/diary/DiaryBind";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import CommonSelect from "../../../../component/form/CommonSelect";
import { MODEL_BIND_METHOD_LIST, type Model } from "../../../../types/baseinfo/Model";
import { nowDate } from "../../../../utils/dateUtils";
import { DELIMITER_OPTION } from "../../../../types/values/OptionType";

interface Props {
    onAdd: (diaryBind: DiaryBind) => void;
    bindCompanies: CustomCompany[];
    models: Model[];
    getBindableQuantity: (modelNum: string) => void;
    bindableQuantity: number;
    printCnList: string[];
    getPrintCnList: (modelNum: string) => void;
    listData: DiaryBind[];
}

const onInit = (): DiaryBind => {
    return {
        bindCompanyName: '',
        bindMethod: '',
        modelNum: '',
        modelName: '',
        amount: 0,
        printCn: '',
        iDate: nowDate,
        price: 0,
        etc: ''
    };
}

export default function DiaryBindFormSection({ onAdd, bindCompanies, models, getBindableQuantity, bindableQuantity, printCnList, getPrintCnList, listData }: Props) {
    const [bindCompanyNames, setBindCompanyNames] = useState<string[]>([]);
    const [modelNums, setModelNums] = useState<string[]>([]);
    const [pricePerBinding, setPricePerBinding] = useState<number>(0);
    const [form, setForm] = useState<DiaryBind>(onInit());

    useEffect(() => {
        setBindCompanyNames(makeDistinctArray(bindCompanies.map(c => c.name)));
        setModelNums(makeDistinctArray(models.map(m => m.modelNum)));
    }, [bindCompanies, models]);

    useEffect(() => {
        const model = models.find(m => m.modelNum === form.modelNum);
        setForm(prev => ({
            ...prev,
            modelName: model?.modelName || "",
            bindMethod: model?.bindMethod || ""
        }));
        setPricePerBinding(model?.pricePerBinding || 0);
        getBindableQuantity(form.modelNum);
        getPrintCnList(form.modelNum);
    }, [form.modelNum]);

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            price: form.amount * pricePerBinding
        }));
    }, [form.amount, pricePerBinding]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const isPrintCnDisabled = (printCn: string) => {
        const alreadyBoundPrintCns = listData.map(bind => bind.printCn);
        return alreadyBoundPrintCns.some(item => item === printCn);
    }

    const handleSubmit = () => {
        onAdd(form);
        setForm(onInit());
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="제본소명" required children={
                <CommonSelect 
                    name="bindCompanyName"
                    value={form.bindCompanyName}
                    onChange={handleChange} 
                    options={[
                        { value: "SEJIN", label : "SEJIN"},
                        DELIMITER_OPTION,
                        ...bindCompanyNames.map(name => ({ value: name, label: name }))
                    ]}
                    />
            } />
            <FormItem label="제본방식" required children={
                <CommonSelect 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={MODEL_BIND_METHOD_LIST.map(method => ({ value: method, label: method }))} />
            } />
            <div />

            {/* 2행 */}
            <FormItem label="모델" required children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums.map(method => ({ value: method, label: method }))} />
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
                    <CommonSelect 
                        name="printCn"
                        value={form.printCn}
                        onChange={handleChange} 
                        options={printCnList.map(printCn => ({
                            value: printCn,
                            label: printCn,
                            isBlocked: isPrintCnDisabled(printCn)
                        }))}
                        />
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
                <span>단가기준 : {pricePerBinding}</span>
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

            <div className="flex items-center mt-2">
                <div className="flex justify-end gap-2">
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                    <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
                </div>
            </div>
            <div className="flex items-center mt-2 col-span-2">
                <div className="text-left leading-5">
                    <div>제본가능량 : <span style={bindableQuantity < 0 ? { color: 'red' } : undefined}>{bindableQuantity}</span></div>
                </div>
            </div>
        </div>
    );
}