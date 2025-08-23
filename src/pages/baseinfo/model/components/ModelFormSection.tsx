import { useEffect, useState } from "react";
import { ModelBindMethod, type Model } from "../../../../types/baseinfo/Model";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { Paper } from "../../../../types/baseinfo/Paper";

interface Props {
    onAdd: (model: Model) => void;
    papers: Paper[];
}

interface PaperOption {
    weights: number[];
    properties: string[];
    standards: string[];
}

export default function ModelFormSection({ onAdd, papers }: Props) {
    const [form, setForm] = useState<Model>({
        modelNum: '',
        modelName: '',
        width: '0.0',
        height: '0.0',
        standardInch: '',
        pages: 0,
        bindMethod: '',
        priceInternal: 0,
        priceExternalA1: 0.00,
        priceExternalA2: 0.00,
        priceExternalB: 0.00,
        coverWeight: '',
        coverProperties: '',
        coverStandard: '',
        coverRequirePaper: 0.00,
        innerWeight: '',
        innerProperties: '',
        innerStandard: '',
        innerRequirePaper: 0.00,
        pricePerBinding: 0,
        companyNameCm: '',
        companyNameInch: '',
        box: '',
        countPerBox: 0,
        printMethod: '',
        coverSobu: 0,
        coverDosu: 0,
        innerSobu: 0,
        innerDosu: 0,
        createdAt: new Date().toISOString().split('T')[0] // yyyy-mm-dd format
    });

    const [coverPaperInfo, setCoverPaperInfo] = useState<PaperOption>({
        weights: [],
        properties: [],
        standards: []
    });

    const [innerPaperInfo, setInnerPaperInfo] = useState<PaperOption>({
        weights: [],
        properties: [],
        standards: []
    });

    // 1. 일단 무게만 초기화
    useEffect(() => {
       setCoverPaperInfo({
            weights: Array.from(new Set(papers.map(p => p.weight))),
            properties: [],
            standards: []
       });
       setInnerPaperInfo({
            weights: Array.from(new Set(papers.map(p => p.weight))),
            properties: [],
            standards: []
       });
    }, [papers]); 

    const initPaperProperties = (weight: number, type: string) => {
        const filtered = papers.filter(p => p.weight === weight);
        if(type === 'cover') {
            setCoverPaperInfo({
                ...coverPaperInfo,
                properties: Array.from(new Set(filtered.map(p => p.properties))),
                standards: []
            });
        }
        if(type === 'inner') {
            setInnerPaperInfo({
                ...innerPaperInfo,
                properties: Array.from(new Set(filtered.map(p => p.properties))),
                standards: []
            });
        }
    };

    const initPaperStandard = (properties: string, type: string) => {
        const filtered = papers.filter(p => p.properties === properties);
        if(type === 'cover') {
            setCoverPaperInfo({
                ...coverPaperInfo,
                standards: Array.from(new Set(filtered.map(p => p.standard)))
            });
        }
        if(type === 'inner') {
            setInnerPaperInfo({
                ...innerPaperInfo,
                standards: Array.from(new Set(filtered.map(p => p.standard)))
            });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if(name === 'coverWeight') {
            initPaperProperties(Number(value), 'cover');
            setForm(prev => ({ ...prev, coverProperties: '', coverStandard: '' }));
        }

        if(name === 'coverProperties') {
            initPaperStandard(value, 'cover');
            setForm(prev => ({ ...prev, coverStandard: '' }));
        }

        if(name === 'innerWeight') {
            initPaperProperties(Number(value), 'inner');
            setForm(prev => ({ ...prev, innerProperties: '', innerStandard: '' }));
        }

        if(name === 'innerProperties') {
            initPaperStandard(value, 'inner');
            setForm(prev => ({ ...prev, innerStandard: '' }));
        }
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({ ...form, modelNum: '', modelName: '', width: '', height: '', standardInch: '', pages: 0, bindMethod: '', priceInternal: 0, priceExternalA1: 0, priceExternalA2: 0, priceExternalB: 0, coverWeight: '', coverProperties: '', coverStandard: '', coverRequirePaper: 0, innerWeight: '', innerProperties: '', innerStandard: '', innerRequirePaper: 0, pricePerBinding: 0, companyNameCm: '', companyNameInch: '', box: '', countPerBox: 0, printMethod: '', coverSobu: 0, coverDosu: 0, innerSobu: 0, innerDosu: 0, createdAt: new Date().toISOString().split('T')[0] });
    }

    const handleSubmit = () => {
        onAdd(form);
    };
    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-gray-200 rounded shadow max-w-6xl mb-4">
            {/* 1행 */}
            <FormItem label="모델" required>
                <InputText name="modelNum" value={form.modelNum} onChange={handleChange} />
            </FormItem>
            <FormItem label="모델명" required additionClass="col-span-2">
                <InputText name="modelName" value={form.modelName} onChange={handleChange} />
            </FormItem>
            <div />

            {/* 2행 */}
            <FormItem label="가로">
                <InputText name="width" value={form.width} onChange={handleChange} />
            </FormItem>
            <FormItem label="세로">
                <InputText name="height" value={form.height} onChange={handleChange} />
            </FormItem>
            <FormItem label="규격(inch)">
                <InputText name="standardInch" value={form.standardInch} onChange={handleChange} />
            </FormItem>
            <FormItem label="매수" labelWidth="w-28">
                <InputText name="pages" value={form.pages} onChange={handleChange} />
            </FormItem>

            {/* 3행 */}
            <FormItem label="국내가">
                <InputText name="priceInternal" value={form.priceInternal} onChange={handleChange} unitText="원"/>
            </FormItem>
            <FormItem label="해외A1가">
                <InputText name="priceExternalA1" value={form.priceExternalA1} onChange={handleChange} unitText="$" />
            </FormItem>
            <FormItem label="해외A2가">
                <InputText name="priceExternalA2" value={form.priceExternalA2} onChange={handleChange} unitText="$" />
            </FormItem>
            <FormItem label="해외B가" labelWidth="w-28">
                <InputText name="priceExternalB" value={form.priceExternalB} onChange={handleChange} unitText="$" />
            </FormItem>

            {/* 4행 */}
            <FormItem label="용지무게(표)">
                <CommonSelect 
                    name="coverWeight" value={form.coverWeight} onChange={handleChange} 
                    options={coverPaperInfo.weights.map(weight => ({ value: weight, label: weight }))} />
            </FormItem>
            <FormItem label="용지지질(표)">
                <CommonSelect 
                    name="coverProperties" value={form.coverProperties} onChange={handleChange} 
                    options={coverPaperInfo.properties.map(property => ({ value: property, label: property }))} />
            </FormItem>
            <FormItem label="용지규격(표)">
                <CommonSelect 
                    name="coverStandard" value={form.coverStandard} onChange={handleChange} 
                    options={coverPaperInfo.standards.map(standard => ({ value: standard, label: standard }))} />
            </FormItem>
            <FormItem label="부당용지소요량(표)" labelWidth="w-28">
                <InputText name="coverRequirePaper" value={form.coverRequirePaper} onChange={handleChange} />
            </FormItem>

            {/* 5행 */}
            <FormItem label="용지무게(내)">
                <CommonSelect 
                    name="innerWeight" value={form.innerWeight} onChange={handleChange} 
                    options={innerPaperInfo.weights.map(weight => ({ value: weight, label: weight }))} />
            </FormItem>
            <FormItem label="용지지질(내)">
                <CommonSelect 
                    name="innerProperties" value={form.innerProperties} onChange={handleChange} 
                    options={innerPaperInfo.properties.map(property => ({ value: property, label: property }))} />
            </FormItem>
            <FormItem label="용지규격(내)">
                <CommonSelect 
                    name="innerStandard" value={form.innerStandard} onChange={handleChange} 
                    options={innerPaperInfo.standards.map(standard => ({ value: standard, label: standard }))} />
            </FormItem>
            <FormItem label="부당용지소요량(내)" labelWidth="w-28">
                <InputText name="innerRequirePaper" value={form.innerRequirePaper} onChange={handleChange} />
            </FormItem>

            {/* 6행: 소부(표) 도수(표) | 제본방식 | 제본단가 */}
            <div className="flex gap-1">
                <FormItem label="소부(표)" additionClass="p-0 m-0 flex-[5.5]">
                    <InputText name="coverSobu" value={form.coverSobu} onChange={handleChange} />
                </FormItem>
                <FormItem label="도수(표)" additionClass="p-0 m-0 flex-[4.5]" labelWidth="w-14">
                    <InputText name="coverDosu" value={form.coverDosu} onChange={handleChange} />
                </FormItem>
            </div>
            <FormItem label="제본방식">
                <SelectText 
                    name="bindMethod" value={form.bindMethod} onChange={handleChange} 
                    options={Object.entries(ModelBindMethod).map(([value, label]) => ({ value, label }))} />
            </FormItem>
            <FormItem label="제본단가">
                <InputText name="pricePerBinding" value={form.pricePerBinding} onChange={handleChange} />
            </FormItem>
            <div />

            {/* 7행: 소부(내) 도수(내) */}
            <div className="flex gap-1">
                <FormItem label="소부(내)" additionClass="p-0 m-0 flex-[5.5]">
                    <InputText name="innerSobu" value={form.innerSobu} onChange={handleChange} />
                </FormItem>
                <FormItem label="도수(내)" additionClass="p-0 m-0 flex-[4.5]" labelWidth="w-14">
                    <InputText name="innerDosu" value={form.innerDosu} onChange={handleChange} />
                </FormItem>
            </div>
            <div />
            <div />
            <div />

            {/* 8행: 쇄입방법 */}
            <FormItem label="쇄입방법">
                <SelectText 
                    name="printMethod" value={form.printMethod} onChange={handleChange} 
                    options={[
                        { value: '에구다', label: '에구다' },
                        { value: '금박', label: '금박' },
                        { value: '마스터', label: '마스터' },
                        { value: '씰크', label: '씰크' },
                        { value: '다이어리', label: '다이어리' },
                ]} />
            </FormItem>
            <div />
            <div />
            <div />

            {/* 9행: 상호규격(cm) | 상호규격(inch) | 사용BOX | 부수/BOX */}
            <FormItem label="상호규격(cm)">
                <InputText name="companyNameCm" value={form.companyNameCm} onChange={handleChange} />
            </FormItem>
            <FormItem label="상호규격(inch)">
                <InputText name="companyNameInch" value={form.companyNameInch} onChange={handleChange} />
            </FormItem>
            <FormItem label="사용BOX">
                <InputText name="box" value={form.box} onChange={handleChange} />
            </FormItem>
            <FormItem label="부수/BOX">
                <InputText name="countPerBox" value={form.countPerBox} onChange={handleChange} />
            </FormItem>

            {/* 버튼 */}
            <div className="col-span-4 flex gap-2 justify-start mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
                <button onClick={onInit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
            </div>
        </div>
    );
}