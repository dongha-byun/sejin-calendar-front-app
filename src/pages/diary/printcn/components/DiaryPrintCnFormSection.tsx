import { forwardRef, useImperativeHandle, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { PRINT_METHODS } from "../../../../types/values/GlobalValues";
import CommonSelect from "../../../../component/form/CommonSelect";
import { nowDate } from "../../../../utils/dateUtils";

interface SearchReq {
    printMethod: string;
    iDate: string;
    orderNum: number;
}

const defaultForm: SearchReq = {
    printMethod: '',
    iDate: nowDate,
    orderNum: 0
}

export type FormSectionRef = {
    handleInit: () => void;
    issueDate: string;
}

interface Props {
    searchOrder: (printMethod: string, orderNum: number) => void;
}

const DiaryPrintCnFormSection = forwardRef<FormSectionRef, Props>((props, ref) => {
    const { searchOrder } = props;

    useImperativeHandle(ref, () => ({
        handleInit: () => {
            onInit();
        },
        issueDate: form.iDate
    }));

    const [form, setForm] = useState<SearchReq>(defaultForm);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        searchOrder(form.printMethod, form.orderNum);
    }

    const onInit = () => {
        setForm(defaultForm);
    }

    return (
        <div className="grid grid-cols-3 min-w-[500px] max-w-[50vw] gap-4 border p-4 mb-4">
            <FormItem label="분류" children={
                <CommonSelect 
                    name="printMethod" 
                    value={form.printMethod} 
                    onChange={handleChange} 
                    options={PRINT_METHODS.map(method => ({value: method, label: method}))}/>
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
                    onChange={handleChange} 
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }} />
            } />
        </div>
    );
});

export default DiaryPrintCnFormSection;