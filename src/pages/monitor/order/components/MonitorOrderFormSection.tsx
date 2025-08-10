import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface SearchReq {
    modelNum: string;
    companyName: string;
    printCn: string;
    orderNum: string;
}

export default function MonitorOrderFormSection() {

    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
        companyName: '',
        printCn: '',
        orderNum: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const models = [
        "모델A", "모델B", "모델C", 
    ];

    const companyNames = [
        "거래처1", "거래처2", "거래처3",
    ];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="모델#" children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={models.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="모델명: " children={
                <span>{form.modelNum}</span>
            } />
            <FormItem label="거래처명" children={
                <SelectText 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <FormItem label="" children={
                <div>
                    <div className="flex items-center gap-2">
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" defaultChecked /> 모두
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" /> 상호
                        </label>
                        <label className="flex items-center gap-1">
                            <input type="radio" name="status" /> 백제본
                        </label>
                    </div>

                    {/* 검색어 */}
                    <InputText 
                        name="printCn"
                        value={form.printCn}
                        onChange={handleChange} />
                </div>
            } />

            {/* 2행 */}
            <div className="flex col-span-2">
                <FormItem label="접수번호 조회" children={
                    <InputText 
                        name="orderNum"
                        value={form.orderNum}
                        onChange={handleChange} />
                } />
                <button className="min-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">검색</button>
            </div>
            <div />
        </div>
    );
}