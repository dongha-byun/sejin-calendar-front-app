import React, { useEffect, useState } from 'react';
import { BindMethod, type Material } from '../../../../types/baseinfo/Material';
import FormItem from '../../../../component/form/FormItem';
import FormRow from '../../../../component/form/FormRow';
import SelectText from '../../../../component/form/SelectText';

const bindMethods: BindMethod[] = [
    BindMethod.IRON,
    BindMethod.HOLDER, 
    BindMethod.ACTATE,
    BindMethod.TWIN,
    BindMethod.BIG_PAPER,
    BindMethod.BOX,
    BindMethod.SACK,
    BindMethod.HALF_MOON,
    BindMethod.VINYL
];

interface Props {
    onChangeBindMethod: (type: BindMethod) => void;
    onAdd: (material: Material) => void;
    list: Material[];
}

export default function MaterialFormSection({ onAdd, list, onChangeBindMethod }: Props) {

    const [form, setForm] = useState<Material>({
        bindMethod: BindMethod.IRON,
        standard1: '',
        standard2: '',
        contents: '',
        color: '', 
    });

    const [standard1s, setStandard1s] = useState<string[]>([]);
    const [standard2s, setStandard2s] = useState<string[]>([]);
    const [contents, setContents] = useState<string[]>([]);
    const [colors, setColors] = useState<string[]>([]);

    useEffect(() => {

    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if(name === "bindMethod") {
            onChangeBindMethod(value as BindMethod);
        }
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({
            bindMethod: BindMethod.IRON,
            standard1: '',
            standard2: '',
            contents: '',
            color: '', 
        });
    };

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    return (
        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-200 rounded shadow max-w-2xl mb-4">
            <FormRow>
                <FormItem label="분류" required children={
                    <SelectText 
                        name="bindMethod"
                        value={form.bindMethod}
                        onChange={handleChange}
                        options={bindMethods.map(c => ({ value: c, label: c }))} />
                } />
            </FormRow>
            <FormRow>
                <FormItem label="규격1" required children={
                    <SelectText 
                        name="standard1"
                        value={form.standard1}
                        onChange={handleChange}
                        options={[
                            { value: '380', label: '380' },
                            { value: '310', label: '310' },
                            { value: '400', label: '400' },
                            { value: '420', label: '420' },
                            { value: '345', label: '345' }
                        ]} />
                } />
                <FormItem label="규격2" children={
                    <SelectText 
                        name="standard2"
                        value={form.standard2}
                        onChange={handleChange}
                        options={[
                            { value: 'A4', label: 'A4' },
                            { value: 'A3', label: 'A3' },
                            { value: 'B4', label: 'B4' },
                            { value: 'B5', label: 'B5' },
                            { value: 'CUSTOM', label: 'CUSTOM' }
                        ]} />
                } />
            </FormRow>
            <FormRow>
                <FormItem label="내역" children={
                    <SelectText 
                        name="contents"
                        value={form.contents}
                        onChange={handleChange}
                        options={[
                            { value: '인쇄', label: '인쇄' },
                            { value: '제본', label: '제본' },
                            { value: '후가공', label: '후가공' },
                            { value: '기타', label: '기타' }
                        ]} />
                } />
                <FormItem label="색상" children={
                    <SelectText 
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                        options={[
                            { value: '흑백', label: '흑백' },
                            { value: '컬러', label: '컬러' },
                            { value: '혼합', label: '혼합' }
                        ]} />
                } />
            </FormRow>
            
            <div className="col-span-4 flex gap-2 justify-start mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}