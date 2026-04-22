import { useEffect, useMemo, useState } from "react";
import FormItem from "../../../../component/form/FormItem";
import InputText, { InputTextSize } from "../../../../component/form/InputText";
import type { Model } from "../../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../../types/baseinfo/CustomCompany";
import type { MonitorPrintCnType } from "../../../../types/monitor/MonitorOrder";
import type { MonitorOrdersQuery } from "../../../../api/monitor/monitorOrderApi";
import { makeDistinctArray } from "../../../../utils/arrayUtils";
import CommonSelect from "../../../../component/form/CommonSelect";

interface SearchReq {
    modelNum: string;
    companyName: string;
    printCn: string;
    orderNum: string;
}

interface Props {
    models: Model[];
    companies: CustomCompany[];
    onMonitorOrdersFetch: (query: MonitorOrdersQuery) => void | Promise<void>;
    onMonitorOrdersClear?: () => void;
    onOrderNumSearch?: (orderNum: string) => void;
}

export default function MonitorOrderFormSection({
    models,
    companies,
    onMonitorOrdersFetch,
    onMonitorOrdersClear,
    onOrderNumSearch,
}: Props) {

    const [form, setForm] = useState<SearchReq>({
        modelNum: '',
        companyName: '',
        printCn: '',
        orderNum: ''
    });

    const [printCnType, setPrintCnType] = useState<MonitorPrintCnType>("ALL");

    const buildMonitorQuery = (): MonitorOrdersQuery => ({
        modelNum: form.modelNum,
        customerName: form.companyName || undefined,
        printCnType,
        printCnKeyword: form.printCn,
    });

    useEffect(() => {
        if (!form.modelNum) {
            onMonitorOrdersClear?.();
            return;
        }
        void onMonitorOrdersFetch(buildMonitorQuery());
    }, [form.modelNum, form.companyName, printCnType, onMonitorOrdersFetch, onMonitorOrdersClear]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handlePrintCnTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrintCnType(e.target.value as MonitorPrintCnType);
    };

    const handleSearchClick = () => {
        if (!form.modelNum) return;
        onOrderNumSearch?.(form.orderNum);
        void onMonitorOrdersFetch(buildMonitorQuery());
    };

    const handleOrderNumKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearchClick();
    };

    const modelNumOptions = useMemo(
        () => makeDistinctArray(models.map(m => m.modelNum)).map((num) => ({ value: num, label: num })),
        [models],
    );

    const companyNameOptions = useMemo(
        () => makeDistinctArray(companies.map((c) => c.name)).map((name) => ({ value: name, label: name })),
        [companies],
    );

    const selectedModelName = useMemo(() => {
        const model = models.find((m) => m.modelNum === form.modelNum);
        return model?.modelName ?? "";
    }, [models, form.modelNum]);

    return (
        <div className="mb-4 flex max-w-3xl flex-col gap-2 rounded bg-white p-3 shadow">
            {/* 1행: 모델 / 모델명 / 거래처명 */}
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
                <FormItem label="모델#" children={
                    <CommonSelect
                        name="modelNum"
                        value={form.modelNum}
                        onChange={handleChange}
                        options={modelNumOptions}
                        isFilterStartWith
                    />
                } />
                <FormItem label="모델명: " children={
                    <span>{selectedModelName}</span>
                } />
                <FormItem label="거래처명" children={
                    <CommonSelect
                        name="companyName"
                        value={form.companyName}
                        onChange={handleChange}
                        options={companyNameOptions}
                        isFilterStartWith
                    />
                } />
            </div>

            {/* 2행: (접수번호 조회 + 검색) | 상호 검색(우측 정렬) */}
            <div className="flex w-full flex-wrap items-center gap-x-2 gap-y-2">
                <div className="flex shrink-0 items-center gap-1.5">
                    <FormItem
                        label="접수번호 조회"
                        additionClass="shrink-0"
                        labelWidth="w-28"
                        children={
                            <InputText
                                name="orderNum"
                                value={form.orderNum}
                                onChange={handleChange}
                                onKeyDown={handleOrderNumKeyDown}
                                size={InputTextSize.Medium}
                            />
                        }
                    />
                    <button
                        type="button"
                        className="shrink-0 self-center rounded bg-gray-300 px-3 py-1 text-sm hover:bg-gray-400"
                        onClick={handleSearchClick}
                    >
                        검색
                    </button>
                </div>
                <div className="flex min-w-0 flex-1 justify-end">
                    <FormItem
                        label=""
                        additionClass="min-w-0 shrink-0"
                        children={
                            <div className="flex flex-nowrap items-center gap-1.5 overflow-x-auto">
                                <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm">
                                    <label className="flex items-center gap-0.5">
                                        <input
                                            type="radio"
                                            name="printCnType"
                                            value="ALL"
                                            checked={printCnType === "ALL"}
                                            onChange={handlePrintCnTypeChange}
                                        />
                                        모두
                                    </label>
                                    <label className="flex items-center gap-0.5">
                                        <input
                                            type="radio"
                                            name="printCnType"
                                            value="PRINT"
                                            checked={printCnType === "PRINT"}
                                            onChange={handlePrintCnTypeChange}
                                        />
                                        상호
                                    </label>
                                    <label className="flex items-center gap-0.5">
                                        <input
                                            type="radio"
                                            name="printCnType"
                                            value="NO_PRINT"
                                            checked={printCnType === "NO_PRINT"}
                                            onChange={handlePrintCnTypeChange}
                                        />
                                        백제본
                                    </label>
                                </div>
                                <InputText
                                    name="printCn"
                                    value={form.printCn}
                                    onChange={handleChange}
                                    size={InputTextSize.Medium}
                                />
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}