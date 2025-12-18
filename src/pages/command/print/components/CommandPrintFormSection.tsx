import { useEffect, useState } from "react";
import type { CommandableQuantityDto, CommandPrintDto } from "../../../../types/command/CommandPrint";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import { nowDate } from "../../../../utils/dateUtils";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { Model } from "../../../../types/baseinfo/Model";
import { decimalCalculate, formatNumber, padDecimal } from "../../../../utils/numberUtils";
import type { Paper } from "../../../../types/baseinfo/Paper";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

interface PrintableQuantity {
    inner: number;
    cover: number;
}

interface Props {
    onAdd: (commandPrint: CommandPrintDto) => void;
    companies: CustomCompany[];
    models: Model[];
    papers: Paper[];
    nextStatementNum: string;
    coverCommandableQuantity: CommandableQuantityDto;
    innerCommandableQuantity: CommandableQuantityDto;
    fetchCommandableQuantity: (printCompanyName: string, weight: number, properties: string, standard: string, type: 'cover' | 'inner') => void;
}

export default function CommandPrintFormSection({ onAdd, companies, models, papers, nextStatementNum, coverCommandableQuantity, innerCommandableQuantity, fetchCommandableQuantity }: Props) {
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
        rDate: '',
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
    const [printableQuantity, setPrintableQuantity] = useState<PrintableQuantity>({
        cover: 0,
        inner: 0
    });

    useEffect(() => {
        if (nextStatementNum) {
            setForm(prev => ({
                ...prev,
                statementNum: nextStatementNum
            }));
        }
    }, [nextStatementNum]);

    useEffect(() => {
        const weights = makeDistinctArray(papers.map(p => p.weight));
        setInnerWeightList(weights);
        setCoverWeightList(weights);
        setInnerPropertiesList([]);
        setInnerStandardList([]);
        setCoverPropertiesList([]);
        setCoverStandardList([]);
    }, [papers]);

    useEffect(() => {
        const model = models.find(model => model.modelNum === form.modelNum);
        calculateRequirePaper(form.modelNum, Number(form.totalCount));

        setForm((prev) => ({
            ...prev,
            modelName: model?.modelName || "",
            coverWeight: model?.coverWeight ? Number(model.coverWeight) : 0,
            coverProperties: model?.coverProperties || "",
            coverStandard: model?.coverStandard || "",
            innerWeight: model?.innerWeight ? Number(model.innerWeight) : 0,
            innerProperties: model?.innerProperties || "",
            innerStandard: model?.innerStandard || "",
        }));
    }, [form.modelNum]);

    // TODO : 소요량 표시 관련 기능 확인 후 구현 추가 필요 (티켓 SJC-107 확인)
    useEffect(() => {
        if(form.printCompanyName && form.coverWeight && form.coverProperties && form.coverStandard) {
            fetchCommandableQuantity(form.printCompanyName, form.coverWeight, form.coverProperties, form.coverStandard, 'cover');
        }
    }, [form.printCompanyName, form.coverWeight, form.coverProperties, form.coverStandard]);

    useEffect(() => {
        if(form.printCompanyName && form.innerWeight && form.innerProperties && form.innerStandard) {
            fetchCommandableQuantity(form.printCompanyName, form.innerWeight, form.innerProperties, form.innerStandard, 'inner');
        }
    }, [form.printCompanyName, form.innerWeight, form.innerProperties, form.innerStandard]);

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
        calculateRequirePaper(form.modelNum, Number(totalCount));
        setForm(prev => ({
            ...prev,
            totalCount: formatNumber(totalCount)
        }));
    }, [form.orderCount, form.spareCount]);

    // fetchCommandableQuantity 결과가 반영되면 calculateRequirePaper 실행
    useEffect(() => {
        calculateRequirePaper(form.modelNum, Number(form.totalCount.replace(/,/g, "")));
    }, [coverCommandableQuantity, innerCommandableQuantity]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // 용지량 계산 -> 모델, 총 수량 변경시 호출
    const calculateRequirePaper = (modelNum: string, totalCount: number) => {
        const model = models.find(model => model.modelNum === modelNum);
        const coverRequirePaper = model?.coverRequirePaper || 0;
        const innerRequirePaper = model?.innerRequirePaper || 0;

        const coverRequirePaperValue = coverRequirePaper * totalCount / 10000;
        const innerRequirePaperValue = innerRequirePaper * totalCount / 10000;

        setForm(prev => ({
            ...prev,
            coverRequirePaper: formatNumber(coverRequirePaperValue),
            innerRequirePaper: formatNumber(innerRequirePaperValue)
        }));

        setPrintableQuantity({
            cover : Number(decimalCalculate(coverCommandableQuantity.quantity, coverRequirePaperValue).toFixed(2)),
            inner : Number(decimalCalculate(innerCommandableQuantity.quantity, innerRequirePaperValue).toFixed(2)),
        });
    }

    const onInit = () => {
        setForm({
            statementNum: nextStatementNum || '',
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
            rDate: '',
            contents: '',
            etc: ''
        });

        setPrintableQuantity({
            cover: 0,
            inner: 0,
        });
        
    }

    const handleSubmit = () => {
        onAdd(form);
        onInit();
    };

    return (
        <div className="grid w-fit [grid-template-columns:repeat(3,minmax(0,14rem))_repeat(3,minmax(0,8rem))] gap-4 p-4 bg-white rounded shadow mb-4">
            {/* 1행 */}
            <FormItem label="전표" required children={
                <InputText 
                    name="statementNum"
                    value={form.statementNum}
                    readOnly />
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
            <FormItem label="용지량(표)" additionClass="flex-none" children={
                <InputText 
                    name="coverRequirePaper"
                    value={form.coverRequirePaper}
                    size={InputTextSize.Small}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="소부(표)" additionClass="flex-none" children={
                <InputText 
                    name="coverSobu"
                    value={form.coverSobu}
                    size={InputTextSize.Small}
                    onChange={handleChange} />
            } />
            <FormItem label="도수(표)" additionClass="flex-none" children={
                <InputText 
                    name="coverDosu"
                    value={form.coverDosu}
                    size={InputTextSize.Small}
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
            <FormItem label="용지량(내)" additionClass="flex-none" children={
                <InputText 
                    name="innerRequirePaper"
                    value={form.innerRequirePaper}
                    size={InputTextSize.Small}
                    onChange={handleChange} 
                    unitText="R"/>
            } />
            <FormItem label="소부(내)" additionClass="flex-none" children={
                <InputText 
                    name="innerSobu"
                    value={form.innerSobu}
                    size={InputTextSize.Small}
                    onChange={handleChange} />
            } />
            <FormItem label="도수(내)" additionClass="flex-none" children={
                <InputText 
                    name="innerDosu"
                    value={form.innerDosu}
                    size={InputTextSize.Small}
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

            <div className="flex items-center mt-2 col-span-2">
                <div className="flex justify-end gap-2">
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">다음</button>
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-1 rounded">계속입력</button>
                    <button onClick={handleSubmit} className="bg-red-500 text-white px-4 py-1 rounded">취소</button>
                </div>
            </div>
            <div className="flex mt-2 col-span-2">
                <div className="text-left leading-5">
                    <div>표인쇄지시가능량 : <span className={(printableQuantity.cover) < 0 ? "text-red-500" : "text-black-700"}>{formatNumber(printableQuantity.cover)}</span></div>
                    <div>내인쇄지시가능량 : <span className={(printableQuantity.inner) < 0 ? "text-red-500" : "text-black-700"}>{formatNumber(printableQuantity.inner)}</span></div>
                </div>
            </div>
            <div className="flex items-center mt-2 col-span-2">
                <div className="flex justify-end gap-2">
                    <button onClick={handleSubmit} className="bg-gray-500 text-white px-4 py-1 rounded">인쇄미리보기</button>
                </div>
            </div>
        </div>
    );
}