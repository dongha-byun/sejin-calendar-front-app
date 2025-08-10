import { useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";

interface SearchReq {
    modelNum: string;
}

export default function MonitorModelFormSection() {

    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const models = [
        "모델A", "모델B", "모델C", "모델D"
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
            <FormItem label="모델명" children={
                <span>{form.modelNum}</span>
            } />
        </div>
    );
}