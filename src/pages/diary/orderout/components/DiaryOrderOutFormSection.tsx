import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { nowDate } from "../../../../utils/dateUtils";

interface SearchReq {
    orderNum: number;
    amount: number;
    iDate: string;
}

const defaultForm: SearchReq = {
    orderNum: 0,
    amount: 0,
    iDate: nowDate
}

export interface DiaryOrderOutFormSectionRef {
    resetForm: () => void;
    focusAndSelectOrderNum: () => void;
    focusAmountInput: () => void;
    clearAmount: () => void;
    getReleaseDate: () => string;
}   

interface Props {
    searchOrder: (orderNum: number) => void;
    applyReleaseAmount: (orderNum: number, amount: number) => void;
}

const DiaryOrderOutFormSection = forwardRef<DiaryOrderOutFormSectionRef, Props>(function DiaryOrderOutFormSection({ searchOrder, applyReleaseAmount }, ref) {
    const [form, setForm] = useState<SearchReq>(defaultForm);
    const orderNumInputRef = useRef<HTMLInputElement>(null);
    const amountInputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        resetForm: () => setForm(defaultForm),
        focusAndSelectOrderNum: () => {
            orderNumInputRef.current?.focus();
            orderNumInputRef.current?.select();
        },
        focusAmountInput: () => amountInputRef.current?.focus(),
        clearAmount: () => setForm(prev => ({ ...prev, amount: 0 })),
        getReleaseDate: () => form.iDate,
    }), []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-200 rounded shadow max-w-[50vw] mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="접수번호" children={
                <InputText 
                    ref={orderNumInputRef}
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchOrder(form.orderNum);
                        }
                    }} />
            } />
            <FormItem label="부수" children={
                <InputText 
                    ref={amountInputRef}
                    name="amount"
                    value={form.amount}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            const orderNum = Number(form.orderNum);
                            const amount = Number(form.amount);
                            if (!orderNum || !amount) return;
                            applyReleaseAmount(orderNum, amount);
                        }
                    }} />
            } />
            <FormItem label="날짜" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
        </div>
    );
});

export default DiaryOrderOutFormSection;