import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

interface SearchReq {
    customerName: string;
    modelNum: string;
    orderNum: string;
}

export default function OrderManagerReturnsFormSection () {
    const [form, setForm] = useState<SearchReq>({
        customerName: '',
        modelNum: '',
        orderNum: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        console.log('취소 버튼 로직 호출');
    };

    const handleSubmit = () => {
        console.log('선택완료 버튼 로직 호출');
    }

    const onExit = () => {
        console.log('종료 버튼 로직 호출');
    }

    const customerNames = [
        "주문인1", "주문인2", "주문인3"
    ];

    const modelNums = [
        "모델1","모델2","모델3","모델4",
    ];

    return (
        <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="주문인" children={
                <SelectText 
                    name="customerName"
                    value={form.customerName}
                    onChange={handleChange}
                    options={customerNames.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="호수" children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="모델명 : " children={
                <span className="flex gap-2 items-center">모델명</span>
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="접수번호" children={
                    <>
                    <InputText 
                        name="orderNum"
                        size={InputTextSize.Medium}
                        value={form.orderNum}
                        onChange={handleChange} />
                    <button className="border border-gray-400 text-black px-4 py-1">접수번호검색</button>
                    </>
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onExit} className="bg-red-500 text-white px-4 py-1 rounded">종료</button>
            </div>
        </div>
    );
}