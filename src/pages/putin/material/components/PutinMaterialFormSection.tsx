import { useEffect, useState } from "react";
import type { PutinMaterial } from "../../../../types/putin/PutinMaterial";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { BindMethod, type Material } from "../../../../types/baseinfo/Material";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import CommonSelect from "../../../../component/form/CommonSelect";
import { approvals, defaultApproval } from "../../../../types/values/GlobalValues";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import { nowDate } from "../../../../utils/dateUtils";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    onAdd: (putinMaterial: PutinMaterial) => void;
    selectedBindMethod: BindMethod;
    setSelectedBindMethod: (method: BindMethod) => void;
    companies: CustomCompany[];
    materials: Material[];
}

export default function PutinMaterialFormSection({ onAdd, setSelectedBindMethod, companies, materials, selectedBindMethod }: Props) {
    const [form, setForm] = useState<PutinMaterial>({
        bindMethod: selectedBindMethod,
        companyName: '',
        standard1: '',
        standard2: '',
        contents: '',
        color: '',
        amount: 0,
        pricePer: "0.00",
        price: "0.00",
        iDate: nowDate,
        approval: defaultApproval,
        etc: ''
    });
    const [standard1List, setStandard1List] = useState<string[]>([]);
    const [standard2List, setStandard2List] = useState<string[]>([]); 
    const [contentsList, setContentsList] = useState<string[]>([]);
    const [colorList, setColorList] = useState<string[]>([]);
    const bindMethods = Object.values(BindMethod);
    const companyNames = companies.map(company => company.name);

    useEffect(() => {
        setStandard1List(makeDistinctArray(materials.map(material => material.standard1)));
        setStandard2List([]);
        setContentsList(makeDistinctArray(materials.map(material => material.contents)));
        setColorList(makeDistinctArray(materials.map(material => material.color)));
    }, [materials]);

    useEffect(() => {
        setStandard2List(makeDistinctArray(materials.filter(material => material.standard1 === form.standard1).map(material => material.standard2)));
    }, [form.standard1]);

    useEffect(() => {
        const price = form.amount * Number(form.pricePer);
        setForm(prev => ({
            ...prev,
            price: price.toFixed(2)
        }));
    }, [form.amount, form.pricePer]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "bindMethod") {
            setSelectedBindMethod(value as BindMethod);
        }

        if(name === "pricePer") {
            // 소수점 둘째자리까지 허용
            const raw = value.replace(/,/g, "");
            if(/^\d*\.?\d{0,2}$/.test(raw)) {
                setForm(prev => ({ ...prev, pricePer: raw }));
            }
            return;
        }

        if(name === "amount") {
            // 정수만 허용
            const raw = value.replace(/,/g, "");
            if(/^\d*$/.test(raw)) {
                setForm(prev => ({ ...prev, amount: raw === "" ? 0 : Number(raw) }));
            }
            return;
        }
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({
            bindMethod: selectedBindMethod,
            companyName: '',
            standard1: '',
            standard2: '',
            contents: '',
            color: '',
            amount: 0,
            pricePer: "0.00",
            price: "0.00",
            iDate: nowDate,
            approval: defaultApproval,
            etc: ''
        });
    }

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="분류" required children={
                <CommonSelect 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="거래처" children={
                <CommonSelect 
                    name="companyName"
                    value={form.companyName}
                    onChange={handleChange}
                    options={companyNames.map(name => ({ value: name, label: name }))} />
            } />
            <FormItem label="규격1" children={
                <CommonSelect 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1List.map(standard1 => ({ value: standard1, label: standard1 }))} />
            } />
            <FormItem label="규격2" children={
                <CommonSelect 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard2List.map(standard2 => ({ value: standard2, label: standard2 }))} />
            } />

            {/* 3행 */}
            <FormItem label="내역" children={
                <CommonSelect 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={contentsList.map(content => ({ value: content, label: content }))} />
            } />
            <FormItem label="색상" children={
                <CommonSelect 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={colorList.map(color => ({ value: color, label: color }))} />
            } />
            <div />

            {/* 4행 */}
            <FormItem label="수량" children={
                <InputText 
                    name="amount"
                    value={form.amount ? formatNumber(form.amount) : "0"}
                    onChange={handleChange} />
            } />
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

            {/* 5행 */}
            <FormItem label="발주일자" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <div />
            <FormItem label="결제" children={
                <CommonSelect 
                    name="approval"
                    value={form.approval}
                    onChange={handleChange}
                    options={approvals.map(approval => ({ value: approval, label: approval }))} />
            } />
            
            {/* 6행 */}
            <div className="flex gap-2 col-span-3">
                <FormItem label="비고" children={
                    <InputText 
                        name="etc"
                        value={form.etc}
                        onChange={handleChange} />
                } />
            </div>

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}