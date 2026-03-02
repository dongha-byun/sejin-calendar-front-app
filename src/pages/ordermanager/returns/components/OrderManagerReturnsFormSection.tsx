import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { Model } from "../../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { option } from "../../../../types/values/OptionType";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

interface SearchReq {
    customerName: string;
    modelNum: string;
    orderNum: string;
}

const defaultForm: SearchReq = {
    customerName: "모두",
    modelNum: "모두",
    orderNum: ""
};

export type OrderManagerReturnsFormSectionRef = {
    refreshSearch: () => void;
};

interface Props {
    models: Model[];
    companies: CustomCompany[];
    searchOrders: (customerName?: string) => void;
    focusOrder: (orderNum: string) => void;
    onInit: () => void;
    onSubmit: () => void;
}

const OrderManagerReturnsFormSection = forwardRef<OrderManagerReturnsFormSectionRef, Props>(
    function OrderManagerReturnsFormSection({ models, companies, searchOrders, focusOrder, onInit, onSubmit }, ref) {
    const [form, setForm] = useState<SearchReq>(defaultForm);
    const [companyOptions, setCompanyOptions] = useState<option[]>([]);
    const [modelOptions, setModelOptions] = useState<option[]>([]);
    const modelNums = makeDistinctArray(models.map(model => model.modelNum));
    const selectedModelName = form.modelNum === "모두" ? "" : models.find(m => m.modelNum === form.modelNum)?.modelName ?? "";

    useEffect(() => {
        const allOption = { value: "모두", label: "모두" };
        const companyNames = companies.map(c => ({ value: c.name, label: c.name }));
        setCompanyOptions([allOption, ...companyNames]);
    }, [companies]);

    useEffect(() => {
        const allOption = { value: "모두", label: "모두" };
        const modelOpts = modelNums.map(num => ({ value: num, label: num }));
        setModelOptions([allOption, ...modelOpts]);
    }, [modelNums]);

    useEffect(() => {
        searchOrders(form.customerName);
    }, [form.customerName, searchOrders]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value ?? "" }));
    };

    const handleInit = () => {
        setForm(defaultForm);
        onInit();
    };

    useImperativeHandle(ref, () => ({
        refreshSearch: () => searchOrders(form.customerName),
    }), [form.customerName, searchOrders]);

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="주문인" children={
                <CommonSelect 
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    options={companyOptions} />
            } />
            <FormItem label="호수" children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelOptions} 
                    isFilterStartWith
                />
            } />
            <FormItem label="모델명" children={
                <span className="flex gap-2 items-center">{selectedModelName}</span>
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="접수번호" children={
                    <>
                    <InputText 
                        name="orderNum"
                        size={InputTextSize.Medium}
                        value={form.orderNum}
                        onChange={handleChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                focusOrder(form.orderNum);
                            }
                        }} />
                    <button 
                        type="button"
                        className="border border-gray-400 text-black px-4 py-1"
                        onClick={() => focusOrder(form.orderNum)}
                    >
                        접수번호검색
                    </button>
                    </>
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button type="button" onClick={handleInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
                <button type="button" onClick={onSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
            </div>
        </div>
    );
});

export default OrderManagerReturnsFormSection;