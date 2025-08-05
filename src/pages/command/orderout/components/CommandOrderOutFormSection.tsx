import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";

interface SearchOrderReq {
    printCn: string;
    sortBy: string;
    orderNum: string;
    companyName: string;
}

export default function CommandOrderOutFormSection() {

    const [form, setForm] = useState<SearchOrderReq>({
        printCn: '',
        sortBy: '',
        orderNum: '',
        companyName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const allSelect = () => {
        console.log("모두선택 로직 호출");
    }

    const selectCancel = () => {
        console.log("선택취소 로직 호출");
    }

    const selectHide = () => {
        console.log("선택숨김 로직 호출");
    }

    const previewPrint = () => {
        console.log("인쇄미리보기 로직 호출");
    }

    const onInit = () => {
        console.log("초기화 로직 호출");
    }

    const onSearchByOrderNum = () => {
        console.log(form.orderNum, "로 검색합니다.");
    }

    const printCnType = [
        "상호", "백제본"
    ];

    const sortByType = [
        "접수번호순", "주문인이름순", "상호순"
    ];

    const companyName = [
        "거래처A", "거래처B", "거래처C", 
    ];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="상호" children={
                <SelectText 
                    name="printCn"
                    value={form.printCn}
                    onChange={handleChange}
                    options={printCnType.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="정렬" children={
                <SelectText 
                    name="sortByType"
                    value={form.sortBy}
                    onChange={handleChange}
                    options={sortByType.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="" children={
                <>
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    size={InputTextSize.Medium}
                    onChange={handleChange} />
                <button onClick={onSearchByOrderNum} className="border border-gray-400 text-black px-4 py-1 rounded">접수번호검색</button>
                </>
            } />
            <FormItem label="거래처명" children={
                <SelectText 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyName.map(method => ({ value: method, label: method }))} />
            } />

            <div className="flex gap-2 mt-2">
                <button onClick={allSelect} className="bg-green-500 text-white px-4 py-1 rounded">모두선택(A)</button>
                <button onClick={selectCancel} className="bg-gray-500 text-white px-4 py-1 rounded">선택취소(C)</button>
                <button onClick={selectHide} className="bg-gray-500 text-white px-4 py-1 rounded">선택숨김(H)</button>
            </div>
            <div />
            <div />
            <div className="flex gap-2 mt-2">
                <button onClick={previewPrint} className="bg-green-500 text-white px-4 py-1 rounded">인쇄미리보기(A)</button>
                <button onClick={onInit} className="bg-gray-500 text-white px-4 py-1 rounded">초기화(C)</button>
            </div>
        </div>
    );
}