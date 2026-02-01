import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { nowDate } from "../../../../utils/dateUtils";
import type { Material } from "../../../../types/baseinfo/Material";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { DiaryBoxingOrder } from "../../../../types/diary/DiaryBoxing";

interface Props {
    boxes: Material[];
    searchOrder: (orderNum: number) => void;
    currentOrder?: DiaryBoxingOrder;
    applyBoxInfo: (orderId: number, realBox: string, realBoxCount: number) => void;
    ref: React.RefObject<FormSectionRef>;
}

interface SearchReq {
    orderNum: number;
    box: string;
    countPerBox: number;
    iDate: string;
}

const defaultForm: SearchReq = {
    orderNum: 0,
    box: '',
    countPerBox: 0,
    iDate: nowDate
}

export type FormSectionRef = {
    handleInit: () => void;
    boxDate: string;
}

export default forwardRef<FormSectionRef, Props>((props, ref) => {
    const { boxes, searchOrder, currentOrder, applyBoxInfo } = props;
    const [form, setForm] = useState<SearchReq>(defaultForm);
    const [boxStadards, setBoxStandards] = useState<string[]>([]);

    useEffect(() => {
        setBoxStandards(boxes.map(box => box.standard1));
    }, [boxes]);

    useImperativeHandle(ref, () => ({
        handleInit: () => {
            setForm(defaultForm);
        },
        boxDate: form.iDate
    }));

    useEffect(() => {
        if(currentOrder) {
            setForm(prev => ({ 
                ...prev, 
                box: currentOrder.modelBox, 
                countPerBox: currentOrder.defaultModelBoxCount }));
        }
    }, [currentOrder]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const applyRealBoxInfo = () => {
        if(currentOrder) {
            applyBoxInfo(currentOrder.orderId, form.box, form.countPerBox);
        }
        // 접수번호 input에 포커스를 이동시킨다.
        const orderNumInput = document.querySelector<HTMLInputElement>('input[name="orderNum"]');
        if (orderNumInput) {
            orderNumInput.focus();
        }
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 rounded shadow max-w-[75vw] mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="접수번호" children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            searchOrder(form.orderNum);
                        }
                    }} />
            } />
            <FormItem label="BOX 번호" children={
                <CommonSelect 
                    name="box"
                    value={form.box}
                    onChange={handleChange} 
                    options={boxStadards.map(box => ({value: box, label: box}))} />
            } />
            <FormItem label="BOX 수" children={
                <InputText 
                    name="countPerBox"
                    value={form.countPerBox}
                    onChange={handleChange} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            applyRealBoxInfo();
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