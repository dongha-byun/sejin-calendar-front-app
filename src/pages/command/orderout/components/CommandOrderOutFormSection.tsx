import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import SelectText from "../../../../component/form/SelectText";
import { OrderTypeOptions, PrintCnTypeOptions } from "../../../../types/command/CommandOrderOut";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { option } from "../../../../types/values/OptionType";

interface SearchOrderReq {
    printCn: string;
    orderType: string;
    orderNum: string;
    companyName: string;
}

interface Props {
    companies: CustomCompany[];
    searchOrders: (printCn: string, orderType: string, customerName: string) => void;
    onSelectAll: () => void;
    onSelectedClear: () => void;
    onSelectedHide: () => void;
    openPrintPreviewPop: () => void;
    onSearchByOrderNum: (orderNum: string) => void;
}

export default function CommandOrderOutFormSection({companies, searchOrders, onSelectAll, onSelectedClear, onSelectedHide, openPrintPreviewPop, onSearchByOrderNum}: Props) {
    const [companyNames, setCompanyNames] = useState<option[]>([]);
    const [form, setForm] = useState<SearchOrderReq>({
        printCn: "NO_PRINT",
        orderType: "ORDER_NUM",
        orderNum: '',
        companyName: '',
    });

    useEffect(() => {
        const allOption = { value: '', label: '모두' };
        const companyNames = companies.map(c => ({ value: c.name, label: c.name }));
        setCompanyNames([allOption, ...companyNames]);
    }, [companies]);

    // 초기 로드 및 form 변경 시 실행
    useEffect(() => {
        searchOrders(form.printCn, form.orderType, form.companyName);
    }, [form.printCn, form.orderType, form.companyName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const previewPrint = () => {
        openPrintPreviewPop();
    }

    const onInit = () => {
        setForm({
            printCn: "NO_PRINT",
            orderType: "ORDER_NUM",
            orderNum: '',
            companyName: '',
        });
    }

    const handleSearchByOrderNum = () => {
        if (form.orderNum.trim()) {
            onSearchByOrderNum(form.orderNum);
        }
    }

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="상호" children={
                <SelectText 
                    name="printCn"
                    value={form.printCn}
                    onChange={handleChange}
                    options={PrintCnTypeOptions} />
            } />
            <FormItem label="정렬" children={
                <SelectText 
                    name="orderType"
                    value={form.orderType}
                    onChange={handleChange}
                    options={OrderTypeOptions} />
            } />
            <FormItem label="" children={
                <>
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    size={InputTextSize.Medium}
                    onChange={handleChange} />
                <button onClick={handleSearchByOrderNum} className="border border-gray-400 text-black px-4 py-1 rounded">접수번호검색</button>
                </>
            } />
            <FormItem label="거래처명" children={
                <SelectText 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames} />
            } />

            <div className="flex gap-2 mt-2 col-span-2">
                <button onClick={onSelectAll} className="bg-green-500 text-white px-4 py-1 rounded">모두선택(A)</button>
                <button onClick={onSelectedClear} className="bg-gray-500 text-white px-4 py-1 rounded">선택취소(C)</button>
                <button onClick={onSelectedHide} className="bg-gray-500 text-white px-4 py-1 rounded">선택숨김(H)</button>
            </div>
            <div />
            <div className="flex gap-2 mt-2">
                <button onClick={previewPrint} className="bg-green-500 text-white px-4 py-1 rounded">인쇄미리보기(A)</button>
                <button onClick={onInit} className="bg-gray-500 text-white px-4 py-1 rounded">초기화(C)</button>
            </div>
        </div>
    );
}