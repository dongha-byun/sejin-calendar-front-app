import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface SearchReq {
    orderNum: string;
    box: string;
    countPerBox: number;
    iDate: string;
}

export default function DiaryPackagingFormSection () {
    const [form, setForm] = useState<SearchReq>({
        orderNum: '',
        box: '',
        countPerBox: 0,
        iDate: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const boxs = [
        "1", "2", "3"
    ];

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 rounded shadow max-w-[75vw] mb-2 mt-2">
            {/* 1행 */}
            <FormItem label="접수번호" children={
                <InputText 
                    name="orderNum"
                    value={form.orderNum}
                    onChange={handleChange} />
            } />
            <FormItem label="BOX 번호" children={
                <SelectText 
                    name="box"
                    value={form.box}
                    onChange={handleChange} 
                    options={boxs.map(box => ({value: box, label: box}))} />
            } />
            <FormItem label="BOX 수" children={
                <InputText 
                    name="countPerBox"
                    value={form.countPerBox}
                    onChange={handleChange} />
            } />
            <FormItem label="날짜" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            
        </div>

    );
}