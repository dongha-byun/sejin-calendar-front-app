import React, { useEffect, useState } from 'react';
import { BindMethod, type Material } from '../../../../types/baseinfo/Material';
import FormItem from '../../../../component/form/FormItem';
import SelectText from '../../../../component/form/SelectText';
import { isNotBlank } from '../../../../utils/stringUtils';

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
        setStandard1s(Array.from(new Set(list.map(material => material.standard1))));

        setForm(prev => ({
            bindMethod: prev.bindMethod,
            standard1: '',
            standard2: '',
            contents: '',
            color: '',
        }));

        setStandard2s([]);
        setContents(Array.from(new Set(list.map(material => material.contents).filter(value => isNotBlank(value)))));
        setColors(Array.from(new Set(list.map(material => material.color).filter(value => isNotBlank(value)))));
    }, [list]);

    useEffect(() => {
        const filtered = list.filter(material => material.standard1 === form.standard1);
        const filteredStandard2s = filtered.map(material => material.standard2).filter(value => isNotBlank(value));
        
        if(filteredStandard2s && filteredStandard2s.length > 0) {
            setStandard2s(Array.from(new Set(filteredStandard2s )));
        }
        
    }, [form.standard1]);

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
        <div className="grid grid-cols-3 gap-4 p-4 bg-white rounded shadow mb-4 max-w-[50vw]">
            {/* 1행 */}
            <FormItem label="분류" required children={
                <SelectText 
                    name="bindMethod"
                    value={form.bindMethod}
                    onChange={handleChange}
                    options={bindMethods.map(c => ({ value: c, label: c }))} />
            } />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="규격1" required children={
                <SelectText 
                    name="standard1"
                    value={form.standard1}
                    onChange={handleChange}
                    options={standard1s.map(c => ({ value: c, label: c }))} />
            } />
            <FormItem label="규격2" children={
                <SelectText 
                    name="standard2"
                    value={form.standard2}
                    onChange={handleChange}
                    options={standard2s.map(c => ({ value: c, label: c }))} />
            } />
            <div />

            {/* 3행 */}
            <FormItem label="내역" children={
                <SelectText 
                    name="contents"
                    value={form.contents}
                    onChange={handleChange}
                    options={contents.map(c => ({ value: c, label: c }))} />
            } />
            <FormItem label="색상" children={
                <SelectText 
                    name="color"
                    value={form.color}
                    onChange={handleChange}
                    options={colors.map(c => ({ value: c, label: c }))} />
            } />
            <div />

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}