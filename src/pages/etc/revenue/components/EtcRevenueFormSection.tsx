import { useEffect, useMemo, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import CommonSelect from "../../../../component/form/CommonSelect";
import type { Model } from "../../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { EtcRevenueQuery, RevenuePrintCnType } from "../../../../types/etc/EtcRevenue";
import { makeDistinctArray } from "../../../../utils/arrayUtils";

const fmt = (d: Date) => d.toISOString().substring(0, 10);
const toToday = () => fmt(new Date());
const toYesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return fmt(d); };
const toDaysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return fmt(d); };
const toMonthsAgo = (n: number) => { const d = new Date(); d.setMonth(d.getMonth() - n); return fmt(d); };

interface FormState {
    modelNum: string;
    customerName: string;
    printCnType: RevenuePrintCnType;
    printCnKeyword: string;
    startDate: string;
    endDate: string;
}

interface Props {
    models: Model[];
    companies: CustomCompany[];
    onSearch: (query: EtcRevenueQuery) => void;
}

export default function EtcRevenueFormSection({ models, companies, onSearch }: Props) {
    const today = toToday();
    const [form, setForm] = useState<FormState>({
        modelNum: '',
        customerName: '',
        printCnType: 'ALL',
        printCnKeyword: '',
        startDate: today,
        endDate: today,
    });

    const toQuery = (f: FormState): EtcRevenueQuery => ({
        startDate: f.startDate,
        endDate: f.endDate,
        modelNum: f.modelNum || undefined,
        customerName: f.customerName || undefined,
        printCnType: f.printCnType,
        printCnKeyword: f.printCnKeyword,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => onSearch(toQuery(form));

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSearch();
    };

    const applyQuickDate = (startDate: string, endDate: string) => {
        const updated = { ...form, startDate, endDate };
        setForm(updated);
        onSearch(toQuery(updated));
    };

    useEffect(() => {
        onSearch(toQuery(form));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.modelNum, form.customerName, form.printCnType]);

    const modelNumOptions = useMemo(
        () => makeDistinctArray(models.map(m => m.modelNum)).map(num => ({ value: num, label: num })),
        [models],
    );

    const companyNameOptions = useMemo(
        () => makeDistinctArray(companies.map(c => c.name)).map(name => ({ value: name, label: name })),
        [companies],
    );

    const selectedModelName = useMemo(
        () => models.find(m => m.modelNum === form.modelNum)?.modelName ?? '',
        [models, form.modelNum],
    );

    const quickBtn = (label: string, onClick: () => void) => (
        <button
            type="button"
            onClick={onClick}
            className="shrink-0 rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300"
        >
            {label}
        </button>
    );

    return (
        <div className="mb-3 flex flex-col gap-2 rounded bg-white p-3 shadow">
            {/* 1행: 모델 / 모델명 / 거래처명 / 인쇄처 */}
            <div className="flex flex-wrap items-center gap-3">
                <FormItem label="모델#" additionClass="shrink-0">
                    <CommonSelect
                        name="modelNum"
                        value={form.modelNum}
                        onChange={handleChange}
                        options={modelNumOptions}
                        isFilterStartWith
                    />
                </FormItem>
                <FormItem label="모델명" additionClass="shrink-0">
                    <span className="text-blue-600 font-semibold text-sm min-w-[80px]">{selectedModelName}</span>
                </FormItem>
                <FormItem label="거래처명" additionClass="shrink-0">
                    <CommonSelect
                        name="customerName"
                        value={form.customerName}
                        onChange={handleChange}
                        options={companyNameOptions}
                        isFilterStartWith
                    />
                </FormItem>
                <FormItem label="인쇄처" additionClass="shrink-0">
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 text-sm whitespace-nowrap">
                            {(['ALL', 'PRINT', 'NO_PRINT'] as RevenuePrintCnType[]).map(type => (
                                <label key={type} className="flex items-center gap-0.5 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="printCnType"
                                        value={type}
                                        checked={form.printCnType === type}
                                        onChange={() => setForm(prev => ({ ...prev, printCnType: type }))}
                                    />
                                    {type === 'ALL' ? '모두' : type === 'PRINT' ? '상호' : '백제본'}
                                </label>
                            ))}
                        </div>
                        <InputText
                            name="printCnKeyword"
                            value={form.printCnKeyword}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            size={InputTextSize.Medium}
                            placeholder="인쇄처 검색"
                        />
                    </div>
                </FormItem>
            </div>

            {/* 2행: 빠른날짜 버튼 + 기간 + 검색 */}
            <div className="flex flex-wrap items-center gap-2">
                <div className="w-20 shrink-0" />
                {quickBtn('당일', () => { const d = toToday(); applyQuickDate(d, d); })}
                {quickBtn('어제하루', () => { const d = toYesterday(); applyQuickDate(d, d); })}
                {quickBtn('일주일전', () => applyQuickDate(toDaysAgo(7), toToday()))}
                {quickBtn('1달전', () => applyQuickDate(toMonthsAgo(1), toToday()))}
                {quickBtn('3달전', () => applyQuickDate(toMonthsAgo(3), toToday()))}
                <FormItem label="기간" additionClass="shrink-0">
                    <div className="flex items-center gap-1">
                        <InputText
                            name="startDate"
                            type="date"
                            value={form.startDate}
                            onChange={handleChange}
                            size={InputTextSize.Medium}
                        />
                        <span className="text-sm">~</span>
                        <InputText
                            name="endDate"
                            type="date"
                            value={form.endDate}
                            onChange={handleChange}
                            size={InputTextSize.Medium}
                        />
                        <button
                            type="button"
                            onClick={handleSearch}
                            className="rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-600"
                        >
                            검색
                        </button>
                    </div>
                </FormItem>
            </div>
        </div>
    );
}
