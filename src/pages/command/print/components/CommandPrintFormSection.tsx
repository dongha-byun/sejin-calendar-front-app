import { useState } from "react";
import type { CommandPrint } from "../../../../types/command/CommandPrint";
import FormItem from "../../../../component/form/FormItem";
import SelectText from "../../../../component/form/SelectText";
import InputText from "../../../../component/form/InputText";

interface Props {
    onAdd: (commandPrint: CommandPrint) => void;
}

export default function CommandPrintFormSection({ onAdd }: Props) {
    const [form, setForm] = useState<CommandPrint>({
        id: 0,
        statementNum: '',
        printCompanyName: '',
        modelNum: '',
        modelName: '',
        orderCount: 0,
        spareCount: 0,
        totalCount: 0,
        coverWeight: 0,
        coverProperties: '',
        coverStandard: '',
        coverRequirePaper: 0,
        coverSobu: 0,
        coverDosu: 0,
        innerWeight: 0,
        innerProperties: '',
        innerStandard: '',
        innerRequirePaper: 0,
        innerSobu: 0,
        innerDosu: 0,
        iDate: '',
        contents: '',
        etc: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        const newCommandPrint: CommandPrint = {
            ...form,
            id: Date.now()
        };
        onAdd(newCommandPrint);
        setForm({
            id: 0,
            statementNum: '',
            printCompanyName: '',
            modelNum: '',
            modelName: '',
            orderCount: 0,
            spareCount: 0,
            totalCount: 0,
            coverWeight: 0,
            coverProperties: '',
            coverStandard: '',
            coverRequirePaper: 0,
            coverSobu: 0,
            coverDosu: 0,
            innerWeight: 0,
            innerProperties: '',
            innerStandard: '',
            innerRequirePaper: 0,
            innerSobu: 0,
            innerDosu: 0,
            iDate: '',
            contents: '',
            etc: ''
        });
    };

    const companyNames = [
        "삼성", "LG", "SK", "현대", "기아"
    ];

    const models = [
        "모델 A", "모델 B", "모델 C", "모델 D"
    ];

    const weights = [
        70, 80, 90, 100, 120
    ];

    const propertiesOptions = [
        "아르떼", "ART", "판지", "S/W", "미색모조", 
        "르느와르", "등등"
    ];

    const standardOptions = [
        "200-300", "788-1091", "880-625", "636-939", "720-590",
        "1091-788", "625-880", "939-636", "590-720", "등등"
    ];

    return (
        <div className="grid grid-cols-6 gap-4 p-4 bg-white rounded shadow mb-4 max-w-full">
            {/* 1행 */}
            <FormItem label="전표" required children={
                <InputText 
                    name="statementNum"
                    value={form.statementNum}
                    onChange={handleChange} />
            } />
            <FormItem label="인쇄소명" required children={
                <SelectText 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={companyNames.map(method => ({ value: method, label: method }))} />
            } />
            <div />
            <div />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="모델" required children={
                <SelectText 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    options={models.map(method => ({ value: method, label: method }))} />
            } />
            <div className="flex gap-2 col-span-2">
                <FormItem label="모델명" children={
                <InputText 
                    name="modelName"
                    value={form.modelName}
                    onChange={handleChange} />
            } />
            </div>
            <div />
            <div />
            <div />

            {/* 3행 */}
            <FormItem label="수량" children={
                <InputText 
                    name="orderCount"
                    value={form.orderCount}
                    onChange={handleChange} />
            } />
            <FormItem label="여분" children={
                <InputText 
                    name="spareCount"
                    value={form.spareCount}
                    onChange={handleChange} />
            } />
            <FormItem label="총수량" required children={
                <InputText 
                    name="totalCount"
                    value={form.totalCount}
                    onChange={handleChange} />
            } />
            <div />
            <div />
            <div />

            {/* 4행 */}
            <FormItem label="무게(표)" children={
                <SelectText 
                    name="coverWeight"
                    value={form.coverWeight}
                    onChange={handleChange} 
                    options={weights.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="지질(표)" children={
                <SelectText 
                    name="coverProperties"
                    value={form.coverProperties}
                    onChange={handleChange} 
                    options={propertiesOptions.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="규격(표)" children={
                <SelectText 
                    name="coverStandard"
                    value={form.coverStandard}
                    onChange={handleChange} 
                    options={standardOptions.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="용지량(표)" children={
                <InputText 
                    name="coverRequirePaper"
                    value={form.coverRequirePaper}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="소부(표)" children={
                <InputText 
                    name="coverSobu"
                    value={form.coverSobu}
                    onChange={handleChange} />
            } />
            <FormItem label="도수(표)" children={
                <InputText 
                    name="coverDosu"
                    value={form.coverDosu}
                    onChange={handleChange} />
            } />

            {/* 5행 */}
            <FormItem label="무게(내)" children={
                <SelectText 
                    name="innerWeight"
                    value={form.innerWeight}
                    onChange={handleChange} 
                    options={weights.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="지질(내)" children={
                <SelectText 
                    name="innerProperties"
                    value={form.innerProperties}
                    onChange={handleChange} 
                    options={propertiesOptions.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="규격(내)" children={
                <SelectText 
                    name="innerStandard"
                    value={form.innerStandard}
                    onChange={handleChange} 
                    options={standardOptions.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="용지량(내)" children={
                <InputText 
                    name="innerRequirePaper"
                    value={form.innerRequirePaper}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="소부(내)" children={
                <InputText 
                    name="innerSobu"
                    value={form.innerSobu}
                    onChange={handleChange} />
            } />
            <FormItem label="도수(내)" children={
                <InputText 
                    name="innerDosu"
                    value={form.innerDosu}
                    onChange={handleChange} />
            } />

            {/* 6행 */}
            <FormItem label="지시일" children={
                <InputText 
                    name="iDate"
                    value={form.iDate}
                    onChange={handleChange} />
            } />
            <div />
            <div />
            <div />
            <div />
            <div />

            {/* 7행 */}
            <div className="flex gap-2 col-span-6">
                <FormItem label="지시사항" children={
                    <InputText 
                        name="contents"
                        value={form.contents}
                        onChange={handleChange} />
                } />
            </div>

            {/* 8행 */}
            <div className="flex gap-2 col-span-4">
                <FormItem label="비고" children={
                    <InputText 
                        name="etc"
                        value={form.etc}
                        onChange={handleChange} />
                } />
            </div>
            <div />
            <div />

            <div className="flex gap-2 mt-2">
                <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">확인</button>
            </div>
        </div>
    );
}