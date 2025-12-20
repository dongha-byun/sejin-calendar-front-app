import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

interface OrderSearchReq {
    orderNum: string;
    printMethod: string;
}

interface Props {
    addOrder: (orderNum: number) => void;
    onSelectAll: () => void;
    onDeleteSelected: () => void;
}

export default function CommandCustomPrintFormSection (props: Props) {
    const { addOrder, onSelectAll, onDeleteSelected } = props;

    const [form, setForm] = useState<OrderSearchReq>({
        orderNum: '',
        printMethod: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onEnterOrderNum = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            addOrder(Number(form.orderNum));
            setForm(prev => ({ ...prev, orderNum: '' }));
        }
    };

    const onPrint = () => {
        console.log("인쇄 로직 실행");
    }

    const onInit = () => {
        console.log("초기화 로직 실행");
    }
    
    const printMethods = [
        "에구다", "금박", "마스타"
    ];

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="접수번호" children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} 
                    onKeyDown={onEnterOrderNum} />
            } />
            <FormItem label="쇄입방법" children={
                <SelectText 
                    name="printMethod"
                    value={form.printMethod}
                    onChange={handleChange}
                    options={printMethods.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="" children={
                <div>
                    <button onClick={onPrint} className="border border-gray-400 text-black px-4 py-1 mx-1 rounded">인쇄</button>
                    <button onClick={onInit} className="border border-gray-400 text-red px-4 py-1 mx-1 rounded">초기화</button>
                </div>
            } />

            <div className="flex gap-2 mt-2">
                <button onClick={onSelectAll} className="bg-green-500 text-white px-4 py-1 rounded">모두선택(A)</button>
                <button onClick={onDeleteSelected} className="bg-gray-500 text-white px-4 py-1 rounded">선택삭제(A)</button>
            </div>
        </div>
    );
}