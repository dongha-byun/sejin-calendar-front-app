import { useEffect, useRef, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { TextAlign } from "../../../../component/form/InputText";
import { deliveryMethods, type OrderCreateRequestDto } from "../../../../types/ordermanager/Order";
import { nowDate } from "../../../../utils/dateUtils";
import type { Model } from "../../../../types/baseinfo/Model";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import CommonSelect from "../../../../component/form/CommonSelect";
import { formatNumber, padDecimal } from "../../../../utils/numberUtils";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";

interface Props {
    onAdd: (order: OrderCreateRequestDto, onSuccess: () => void) => void;
    models: Model[];
    companies: CustomCompany[];
    nextOrderNum: string;
}

const defaultPrintCn = "백제본";

export default function OrderManagerAcceptFormSection({ onAdd, models, companies, nextOrderNum }: Props) {
    const printCnRef = useRef<HTMLInputElement>(null);
    const [form, setForm] = useState<OrderCreateRequestDto>({
        orderNum: '', // 접수번호
        customerName: '', // 주문인
        modelNum: '', // 모델
        modelName: '', // 모델명
        amount: "0", // 주문량
        printCn: defaultPrintCn, // 상호
        dosu: '', // 도수
        iDate: nowDate, // 주문일자
        pricePer: "0", // 단가
        price: "0.00", // 금액
        deliveryMethod: '', // 납품방법
        shipNum: '', // 선방번호
        etc1: '', // 비고1
        etc2: '', // 비고2
        etc3: '', // 비고3
        checkedReleaseNumAutoCreate: false, // 출고증 번호 자동 부여
    });
    const [selectedModel, setSelectedModel] = useState<Model>();
    const [selectedCompany, setSelectedCompany] = useState<CustomCompany>();

    const modelNums = makeDistinctArray(models.map(model => model.modelNum));
    const companyNames = makeDistinctArray(companies.map(company => company.name));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            orderNum: nextOrderNum
        }));
    }, [nextOrderNum]);

    useEffect(() => {
        const company = companies.find(company => company.name === form.customerName);
        setSelectedCompany(company);
    }, [form.customerName]);

    useEffect(() => {
        const model = models.find(model => model.modelNum === form.modelNum);
        setSelectedModel(model);
        setForm((prev) => ({
            ...prev,
            modelName: model?.modelName || "",
            pricePer: formatNumber(model?.priceInternal || 0),
        }));
    }, [form.modelNum]);

    useEffect(() => {
        const amount = Number(form.amount.replace(/,/g, ""));
        const pricePer = Number(form.pricePer.replace(/,/g, ""));
        setForm((prev) => ({
            ...prev,
            price: formatNumber(amount * pricePer),
        }));

    }, [form.amount, form.pricePer]);

    useEffect(() => {
        if(form.printCn === defaultPrintCn) {
            setForm(prev => ({
                ...prev,
                dosu : "1"
            }));
        }
    }, [form.printCn]);

    const onInit = () => {
        setForm({
            orderNum: nextOrderNum, // 접수번호
            customerName: '', // 주문인
            modelNum: '', // 모델
            modelName: '', // 모델명
            amount: "0", // 주문량
            printCn: defaultPrintCn, // 상호
            dosu: '', // 도수
            iDate: nowDate, // 주문일자
            pricePer: "0", // 단가
            price: "0.00", // 금액
            deliveryMethod: '', // 납품방법
            shipNum: '', // 선방번호
            etc1: '', // 비고1
            etc2: '', // 비고2
            etc3: '', // 비고3
            checkedReleaseNumAutoCreate: false, // 출고증 번호 자동 부여
        });
    }

    const handleSubmit = () => {
        onAdd(form, onInit);
    };
    
    const addCustomer = () => {
        // 거래처 총판 추가
        alert("거래처총판추가 호출됨");
    }

    const checkPrintCn = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.checked) {
            // 상호 input text 선택(텍스트 블럭)처리
            if(printCnRef.current) {
                printCnRef.current.focus();
                printCnRef.current.setSelectionRange(0, printCnRef.current.value.length);
            }
        } else {
            setForm(prev => ({
                ...prev,
                printCn: defaultPrintCn
            }));
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "pricePer" || name === "price") {
            setForm(prev => ({ ...prev, [name]: padDecimal(value) }));
        }
    };

    return(
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="접수번호" required children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} 
                    readOnly
                />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="주문인" required children={
                    <CommonSelect 
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        options={companyNames.map(name => ({ value: name, label: name }))} 
                        isFilterStartWith
                    />
                } />
            </div>
            <div className="flex gap-2 items-center">
                <button onClick={addCustomer} className="border border-gray-400 text-black px-4 py-1 rounded">거래처총판추가</button>
            </div>

            {/* 2행 */}
            <FormItem label="모델" required children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelNums.map(method => ({ value: method, label: method }))} 
                    isFilterStartWith
                />
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
                    value={formatNumber(form.amount)}
                    onChange={handleChange} 
                    textAlign={TextAlign.Right} />
            } />
            <div className="flex gap-2 col-span-3">
                <FormItem label="상호" checkEvent={checkPrintCn} children={
                    <InputText 
                        name="printCn"
                        value={form.printCn}
                        onChange={handleChange} 
                        ref={printCnRef}
                    />
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
                    value={formatNumber(form.pricePer)}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    textAlign={TextAlign.Right}
                />
            } />
            <FormItem label="금액" children={
                <InputText 
                    name="price"
                    value={formatNumber(form.price)}
                    onChange={handleChange} 
                    onBlur={handleBlur}
                    textAlign={TextAlign.Right}
                />
            } />
            <div />
            <div />

            {/* 6행 */}
            <FormItem label="납품방법" children={
                <CommonSelect 
                    name="deliveryMethod"
                    value={form.deliveryMethod}
                    onChange={handleChange} 
                    options={deliveryMethods.map(dm => ({ value: dm, label: dm }))}/>
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
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
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