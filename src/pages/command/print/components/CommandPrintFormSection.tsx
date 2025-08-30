import { useEffect, useState } from "react";
import type { CommandPrintDto } from "../../../../types/command/CommandPrint";
import FormItem from "../../../../component/form/FormItem";
import InputText from "../../../../component/form/InputText";
import { nowDate } from "../../../../utils/dateUtils";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { Model } from "../../../../types/baseinfo/Model";
import { formatNumber } from "../../../../utils/numberUtils";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

interface Props {
    onAdd: (commandPrint: CommandPrintDto) => void;
    companies: CustomCompany[];
    models: Model[];
    papers: Paper[];
}

export default function CommandPrintFormSection({ onAdd, companies, models, papers }: Props) {
    const [form, setForm] = useState<CommandPrintDto>({
        statementNum: '',
        printCompanyName: '',
        modelNum: '',
        modelName: '',
        orderCount: "0",
        spareCount: "0",
        totalCount: "0",
        coverWeight: 0,
        coverProperties: '',
        coverStandard: '',
        coverRequirePaper: "0.00",
        coverSobu: 0,
        coverDosu: 0,
        innerWeight: 0,
        innerProperties: '',
        innerStandard: '',
        innerRequirePaper: "0.00",
        innerSobu: 0,
        innerDosu: 0,
        iDate: nowDate,
        contents: '',
        etc: ''
    });
    const companyNames = companies.map(c => ({ value: c.name, label: c.name }));
    const modelNums = models.map(m => ({ value: m.modelNum, label: m.modelNum}));
    const [innerWeightList, setInnerWeightList] = useState<number[]>([]);
    const [innerPropertiesList, setInnerPropertiesList] = useState<string[]>([]);
    const [innerStandardList, setInnerStandardList] = useState<string[]>([]);
    const [coverWeightList, setCoverWeightList] = useState<number[]>([]);
    const [coverPropertiesList, setCoverPropertiesList] = useState<string[]>([]);
    const [coverStandardList, setCoverStandardList] = useState<string[]>([]);

    useEffect(() => {
        const weights = makeDistinctArray(papers.map(p => p.weight));
        setInnerWeightList(weights);
        setCoverWeightList(weights);
        setInnerPropertiesList([]);
        setInnerStandardList([]);
        setCoverPropertiesList([]);
        setCoverStandardList([]);
    }, []);

    useEffect(() => {
        const model = models.find(model => model.modelNum === form.modelNum);
        setForm((prev) => ({
            ...prev,
            modelName: model?.modelName || "",
            coverWeight: model?.coverWeight ? Number(model.coverWeight) : 0,
            coverProperties: model?.coverProperties || "",
            coverStandard: model?.coverStandard || "",
            coverRequirePaper: model?.coverRequirePaper ? formatNumber(model.coverRequirePaper) : "0.00",
            innerWeight: model?.innerWeight ? Number(model.innerWeight) : 0,
            innerProperties: model?.innerProperties || "",
            innerStandard: model?.innerStandard || "",
            innerRequirePaper: model?.innerRequirePaper ? formatNumber(model.innerRequirePaper) : "0.00",
        }));
    }, [form.modelNum]);

    useEffect(() => {
        const propertiesList = papers.filter(p => p.weight === form.innerWeight).map(p => p.properties);
        setInnerPropertiesList(makeDistinctArray(propertiesList));
    }, [form.innerWeight]);

    useEffect(() => {
        const standardList = papers.filter(p => p.weight === form.innerWeight)
            .filter(p => p.properties === form.innerProperties)
            .map(p => p.standard);
        setInnerStandardList(standardList);
    }, [form.innerProperties]);

    useEffect(() => {
        const propertiesList = papers.filter(p => p.weight === form.coverWeight).map(p => p.properties);
        setCoverPropertiesList(makeDistinctArray(propertiesList));
    }, [form.coverWeight]);

    useEffect(() => {
        const standardList = papers.filter(p => p.weight === form.coverWeight)
            .filter(p => p.properties === form.coverProperties)
            .map(p => p.standard);
        setCoverStandardList(standardList);
    }, [form.coverProperties]);

    useEffect(() => {
        const totalCount = Number(form.orderCount.replace(/,/g, "")) + Number(form.spareCount.replace(/,/g, ""));
        setForm(prev => ({
            ...prev,
            totalCount: formatNumber(totalCount)
        }));
    }, [form.orderCount, form.spareCount]);
    

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const onInit = () => {
        setForm({
            statementNum: '',
            printCompanyName: '',
            modelNum: '',
            modelName: '',
            orderCount: "0",
            spareCount: "0",
            totalCount: "0",
            coverWeight: 0,
            coverProperties: '',
            coverStandard: '',
            coverRequirePaper: "0.00",
            coverSobu: 0,
            coverDosu: 0,
            innerWeight: 0,
            innerProperties: '',
            innerStandard: '',
            innerRequirePaper: "0.00",
            innerSobu: 0,
            innerDosu: 0,
            iDate: '',
            contents: '',
            etc: ''
        });
    }

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

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
                <CommonSelect 
                    name="printCompanyName"
                    value={form.printCompanyName}
                    onChange={handleChange}
                    options={companyNames} 
                    defaultOption={["공장"]}/>
            } />
            <div />
            <div />
            <div />
            <div />

            {/* 2행 */}
            <FormItem label="모델" required children={
                <CommonSelect 
                    name="modelNum"
                    value={form.modelNum}
                    onChange={handleChange}
                    isFilterStartWith
                    options={modelNums} />
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
                    value={formatNumber(form.orderCount)}
                    onChange={handleChange} />
            } />
            <FormItem label="여분" children={
                <InputText 
                    name="spareCount"
                    value={formatNumber(form.spareCount)}
                    onChange={handleChange} />
            } />
            <FormItem label="총수량" required children={
                <InputText 
                    name="totalCount"
                    value={formatNumber(form.totalCount)}
                    onChange={handleChange} />
            } />
            <div />
            <div />
            <div />

            {/* 4행 */}
            <FormItem label="무게(표)" children={
                <CommonSelect 
                    name="coverWeight"
                    value={form.coverWeight}
                    onChange={handleChange} 
                    options={coverWeightList.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="지질(표)" children={
                <CommonSelect 
                    name="coverProperties"
                    value={form.coverProperties}
                    onChange={handleChange} 
                    options={coverPropertiesList.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="규격(표)" children={
                <CommonSelect 
                    name="coverStandard"
                    value={form.coverStandard}
                    onChange={handleChange} 
                    options={coverStandardList.map(weight => ({ value: weight, label: weight }))} />
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
                <CommonSelect 
                    name="innerWeight"
                    value={form.innerWeight}
                    onChange={handleChange} 
                    options={innerWeightList.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="지질(내)" children={
                <CommonSelect 
                    name="innerProperties"
                    value={form.innerProperties}
                    onChange={handleChange} 
                    options={innerPropertiesList.map(weight => ({ value: weight, label: weight }))} />
            } />
            <FormItem label="규격(내)" children={
                <CommonSelect 
                    name="innerStandard"
                    value={form.innerStandard}
                    onChange={handleChange} 
                    options={innerStandardList.map(weight => ({ value: weight, label: weight }))} />
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