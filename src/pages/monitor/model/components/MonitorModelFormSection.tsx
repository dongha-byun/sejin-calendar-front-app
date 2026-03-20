import { useEffect, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import type { Model } from "../../../../types/baseinfo/Model";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { option } from "../../../../types/values/OptionType";

interface SearchReq {
    modelNum: string;
    modelName: string;
}

interface Props {
    models: Model[];
    onSearch: (modelNum: string) => void;
}

export default function MonitorModelFormSection({ models, onSearch }: Props) {
    const [modelOptions, setModelOptions] = useState<option[]>([]);
    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
        modelName: '',
    });

    useEffect(() => {
        const uniqueModelNums = makeDistinctArray(models.map(m => m.modelNum));
        const options = uniqueModelNums.map(modelNum => ({ value: modelNum, label: modelNum }));
        setModelOptions(options);
    }, [models]);

    useEffect(() => {
        const model = models.find(m => m.modelNum === form.modelNum);
        setForm(prev => ({
            ...prev,
            modelName: model?.modelName || '',
        }));
        
        onSearch(form.modelNum);
    }, [form.modelNum]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[75vw]">
            {/* 1행 */}
            <FormItem label="모델#" children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={modelOptions} />
            } />
            <FormItem label="모델명" children={
                <span>{form.modelName}</span>
            } />
        </div>
    );
}