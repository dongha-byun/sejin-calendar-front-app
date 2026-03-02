import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { Model } from "../../../../types/baseinfo/Model";
import type { option } from "../../../../types/values/OptionType";
import CommonSelect from "../../../../component/form/CommonSelect";

interface SearchReq {
    customerName?: string;
    modelNum?: string;
    modelName: string;
    orderNum?: string;
}

export type OrderManagerCancelFormSectionRef = {
    handleInit: () => void;
    refreshSearch: () => void;
};

interface Props {
    companies: CustomCompany[];
    models: Model[];
    searchOrders: (customerName?: string, modelNum?: string) => void;
    focusOrder: (orderNum: string) => void;
}

const defaultForm: SearchReq = {
    customerName: undefined,
    modelNum: undefined,
    modelName: '',
    orderNum: undefined
};

const OrderManagerCancelFormSection = forwardRef<OrderManagerCancelFormSectionRef, Props>(
    function OrderManagerCancelFormSection({ companies, models, searchOrders, focusOrder }, ref) {
    const [form, setForm] = useState<SearchReq>(defaultForm);
    const [companyNames, setCompanyNames] = useState<option[]>([]);
    const [modelNums, setModelNums] = useState<option[]>([]);

    useImperativeHandle(ref, () => ({
        handleInit: () => setForm(defaultForm),
        refreshSearch: () => searchOrders(form.customerName, form.modelNum),
    }), [form.customerName, form.modelNum, searchOrders]);

    useEffect(() => {
        const allOption = { value: undefined, label: '모두' };
        const companyOpts = companies.map(c => ({ value: c.name, label: c.name }));
        const modelOpts = models.map(m => ({ value: m.modelNum, label: m.modelNum }));
        setCompanyNames([allOption, ...companyOpts]);
        setModelNums([allOption, ...modelOpts]);
    }, [companies, models]);

    useEffect(() => {
        searchOrders(form.customerName, form.modelNum);
    }, [form.customerName, form.modelNum, searchOrders]);

    const selectedModelName = models.find(m => m.modelNum === form.modelNum)?.modelName ?? "";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="주문인" children={
                <CommonSelect 
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    options={companyNames} />
            } />
            <FormItem label="호수" children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums} />
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
                                focusOrder(form.orderNum || '');
                            }
                        }}
                        />
                    <button className="border border-gray-400 text-black px-4 py-1" onClick={() => focusOrder(form.orderNum || '')}>접수번호검색</button>
                    </>
                } />
            </div>
        </div>
    );
});

export default OrderManagerCancelFormSection;