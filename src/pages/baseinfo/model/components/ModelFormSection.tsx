import { useState } from "react";
import type { Model } from "../../../../types/baseinfo/Model";

interface Props {
    onAdd: (model: Model) => void;
}

export default function ModelFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<Model>({
        modelNum: '',
        modelName: '',
        width: '',
        height: '',
        standardInch: '',
        pages: 0,
        bindMethod: '',
        priceInternal: 0,
        priceExternalA1: 0,
        priceExternalA2: 0,
        priceExternalB: 0,
        coverWeight: '',
        coverProperties: '',
        coverStandard: '',
        coverRequirePaper: 0,
        innerWeight: '',
        innerProperties: '',
        innerStandard: '',
        innerRequirePaper: 0,
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        console.log(`Changed ${name} to ${value}`);
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {

        const newModel: Model = {
            ...form,
            id: Date.now()
        };
        onAdd(newModel);
        setForm({ ...form, modelNum: '', modelName: '', width: '', height: '', standardInch: '', pages: 0, bindMethod: '', priceInternal: 0, priceExternalA1: 0, priceExternalA2: 0, priceExternalB: 0, coverWeight: '', coverProperties: '', coverStandard: '', coverRequirePaper: 0, innerWeight: '', innerProperties: '', innerStandard: '', innerRequirePaper: 0, pricePerBinding: 0, companyNameCm: '', companyNameInch: '', box: '', countPerBox: 0, printMethod: '', coverSobu: 0, coverDosu: 0, innerSobu: 0, innerDosu: 0, createdAt: new Date().toISOString().split('T')[0] });
    };
    return (
        <div className="grid grid-cols-4 gap-4 p-4 bg-white rounded shadow mb-4">
            <div>
                <label>모델 *</label>
                <input name="modelNum" value={form.modelNum} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>모델명 *</label>
                <input name="modelName" value={form.modelName} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>가로</label>
                <input name="width" value={form.width} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>세로</label>
                <input name="height" value={form.height} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>규격(inch)</label>
                <input name="standardInch" value={form.standardInch} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>매수</label>
                <input name="pages" value={form.pages} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>국내가</label>
                <input name="priceInternal" value={form.priceInternal} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>해외A1가</label>
                <input name="priceExternalA1" value={form.priceExternalA1} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>해외A2가</label>
                <input name="priceExternalA2" value={form.priceExternalA2} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>해외B가</label>
                <input name="priceExternalB" value={form.priceExternalB} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지무게(표)</label>
                <input name="coverWeight" value={form.coverWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지지질(표)</label>
                <input name="coverProperties" value={form.coverProperties} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지규격(표)</label>
                <input name="coverStandard" value={form.coverStandard} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>부당용지소요량(표)</label>
                <input name="coverRequirePaper" value={form.coverRequirePaper} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지무게(내)</label>
                <input name="innerWeight" value={form.innerWeight} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지지질(내)</label>
                <input name="innerProperties" value={form.innerProperties} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>용지규격(내)</label>
                <input name="innerStandard" value={form.innerStandard} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>부당용지소요량(내)</label>
                <input name="innerRequirePaper" value={form.innerRequirePaper} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>소부(표)</label>
                <input name="coverSobu" value={form.coverSobu} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>도수(표)</label>
                <input name="coverDosu" value={form.coverDosu} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>제본방식</label>
                <input name="bindMethod" value={form.bindMethod} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>제본단가</label>
                <input name="pricePerBinding" value={form.pricePerBinding} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>소부(내)</label>
                <input name="innerSobu" value={form.innerSobu} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>도수(내)</label>
                <input name="innerDosu" value={form.innerDosu} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>쇄입방법</label>
                <input name="printMethod" value={form.printMethod} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>상호규격(cm)</label>
                <input name="companyNameCm" value={form.companyNameCm} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>상호규격(inch)</label>
                <input name="companyNameInch" value={form.companyNameInch} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>사용BOX</label>
                <input name="box" value={form.box} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>
            <div>
                <label>부수/BOX</label>
                <input name="countPerBox" value={form.countPerBox} onChange={handleChange} className="w-full border rounded px-2 py-1" />
            </div>

            <div className="col-span-4 flex gap-2 justify-end mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">확인</button>
            </div>
        </div>
    );
}