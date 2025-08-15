import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface SearchReq {
    printMethod: string;
    iDate: string;
    orderNum: string;
}

export default function DiaryPrintCnFormSection () {
    const [form, setForm] = useState<SearchReq>({
        printMethod: '',
        iDate: '',
        orderNum: ''
    });

    const printMethods = [
        '에구다1', '에구다2', '금박1', '금박2', '다이어리'
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-3 min-w-[500px] max-w-[50vw] gap-4 border p-4 mb-4">
            <FormItem label="분류" children={
                <SelectText 
                    name="printMethod" 
                    value={form.printMethod} 
                    onChange={handleChange} 
                    options={printMethods.map(method => ({value: method, label: method}))}/>
            } />
            <FormItem label="" children={
                <InputText 
                    name="iDate" 
                    value={form.iDate} 
                    onChange={handleChange} />
            } />
            <FormItem label="접수번호" children={
                <InputText 
                    name="orderNum" 
                    value={form.orderNum} 
                    onChange={handleChange} />
            } />
        </div>
    );
}