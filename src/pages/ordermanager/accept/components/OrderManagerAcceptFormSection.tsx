import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import type { Order } from "../../../../types/ordermanager/Order";
import SelectText from "../../../../component/form/SelectText";

interface Props {
    onAdd: (order: Order) => void;
}

export default function OrderManagerAcceptFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<Order>({
        id: 0,
        orderNum: '',
        customerName: '',
        modelNum: '',
        modelName: '',
        amount: 0,
        printCn: '',
        dosu: '',
        iDate: '',
        pricePer: 0,
        price: 0,
        deliveryMethod: '',
        pDate: '',
        pMethod: '',
        pCompleteDate: '',
        boxDate: '',
        boxNum: '',
        boxAmount: 0,
        rNum: '',
        rDate: '',
        rCompleteDate: '',
        state: '',
        shipNum: '',
        etc1: '',
        etc2: '',
        etc3: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newOrder: Order = {
            ...form,
            id: Date.now()
        };
        onAdd(newOrder);
        setForm({
            id: 0,
            orderNum: '',
            customerName: '',
            modelNum: '',
            modelName: '',
            amount: 0,
            printCn: '',
            dosu: '',
            iDate: '',
            pricePer: 0,
            price: 0,
            deliveryMethod: '',
            pDate: '',
            pMethod: '',
            pCompleteDate: '',
            boxDate: '',
            boxNum: '',
            boxAmount: 0,
            rNum: '',
            rDate: '',
            rCompleteDate: '',
            state: '',
            shipNum: '',
            etc1: '',
            etc2: '',
            etc3: ''
        });
    };
    
    const addCustomer = () => {
        // 거래처 총판 추가
        alert("거래처총판추가 호출됨");
    }

    const doInit = () => {
        // 취소 동작 구현
        alert("취소 버튼 호출");
    }

    const checkPrintCn = () => {
        alert("상호 체크박스 체크");
    }

    const customerNames = [
        "총판1", "총판2", "총판3"
    ];

    const models = [
        "모델 A", "모델 B", "모델 C", "모델 D"
    ];

    const deliveryMethod = [
        "납품방법 A", "납품방법 B", "납품방법 C", "납품방법 D",
    ];

    return(
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="접수번호" required children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="주문인" required children={
                    <SelectText 
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        options={customerNames.map(method => ({ value: method, label: method }))} />
                } />
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={addCustomer} className="border border-gray-400 text-black px-4 py-1 rounded">거래처총판추가</button>
            </div>

            {/* 2행 */}
            <FormItem label="모델" required children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={models.map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2 col-span-3">
                <FormItem label="모델명" children={
                    <InputText 
                        name="modelName"
                        value={form.modelName}
                        onChange={handleChange} />
                } />
            </div>

            {/* 3행 */}
            <FormItem label="주문량" required children={
                <InputText 
                    name="amount"
                    value={form.amount}
                    onChange={handleChange} />
            } />
            <div className="flex gap-2 col-span-3">
                <FormItem label="상호" checkEvent={checkPrintCn} children={
                    <InputText 
                        name="printCn"
                        value={form.printCn}
                        onChange={handleChange} />
                } />
            </div>

            {/* 4행 */}
            <FormItem label="도수" children={
                <InputText 
                    name="dosu"
                    value={form.dosu}
                    onChange={handleChange} />
            } />
            <FormItem label="주문일자" required children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <div />
            <div />

            {/* 5행 */}
            <FormItem label="단가" children={
                <InputText 
                    name="pricePer"
                    value={form.pricePer}
                    onChange={handleChange} />
            } />
            <FormItem label="금액" children={
                <InputText 
                    name="price"
                    value={form.price}
                    onChange={handleChange} />
            } />
            <div />
            <div />

            {/* 6행 */}
            <FormItem label="납품방법" children={
                <SelectText 
                    name="deliveryMethod"
                    value={form.deliveryMethod}
                    onChange={handleChange} 
                    options={deliveryMethod.map(dm => ({ value: dm, label: dm }))}/>
            } />
            <FormItem label="선방번호" children={
                <InputText 
                    name="shipNum"
                    value={form.shipNum}
                    onChange={handleChange} />
            } />
            <div />
            <div />

            {/* 7행 */}
            <div className="flex gap-2 col-span-4">
                <FormItem label="비고1" children={
                    <InputText 
                        name="etc1"
                        value={form.etc1}
                        onChange={handleChange} />
                } />
            </div>

            {/* 8행 */}
            <div className="flex gap-2 col-span-4">
                <FormItem label="비고2" children={
                    <InputText 
                        name="etc2"
                        value={form.etc2}
                        onChange={handleChange} />
                } />
            </div>

            {/* 9행 */}
            <div className="flex gap-2 col-span-4">
                <FormItem label="비고3" children={
                    <InputText 
                        name="etc3"
                        value={form.etc3}
                        onChange={handleChange} />
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={doInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
            <div className="flex gap-2 items-center">
                <label className="inline-flex items-center space-x-2 cursor-pointer px-2 py-1 rounded">
                    <input type="checkbox"
                        className="form-checkbox text-indigo-600 transition duration-150 ease-in-out items-center"/>
                    <span className="text-sm text-gray-700">출고증 번호 자동 부여</span>
                </label>
            </div>
        </div>
    );
}