import { useCallback, useEffect, useRef, useState } from "react";
import MonitorPrintFormSection, { type MonitorPrintFormSectionRef, type MonitorPrintStockRequest } from "./components/MonitorPrintFormSection";
import MonitorPrintFirstTable from "./components/MonitorPrintFirstTable";
import MonitorPrintSecondTable from "./components/MonitorPrintSecondTable";
import MonitorPrintThirdTable from "./components/MonitorPrintThirdTable";
import MonitorPrintButton from "./components/MonitorPrintButton";
import PageHeader from "../../../component/layout/PageHeader";
import type { MonitorPrintStockResponse } from "../../../types/monitor/MonitorPrintStockResponse";
import { monitorPrintApi } from "../../../api/monitor/monitorPrintApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { paperApi } from "../../../api/baseinfo/paperApi";
import type { Paper } from "../../../types/baseinfo/Paper";

export default function MonitorPrintPage() {
    const [response, setResponse] = useState<MonitorPrintStockResponse>();
    const [paperCompanies, setPaperCompanies] = useState<CustomCompany[]>([]);
    const [printCompanies, setPrintCompanies] = useState<CustomCompany[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [isDetail, setIsDetail] = useState(true);
    const formSectionRef = useRef<MonitorPrintFormSectionRef | null>(null);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Paper).then(setPaperCompanies);
        customCompanyApi.list(CompanyType.Printing).then(setPrintCompanies);
        paperApi.list().then(setPapers);
        search({});
    }, []);

    const search = useCallback((req: Partial<MonitorPrintStockRequest>) => {
        monitorPrintApi.search(req).then(setResponse).catch(err => {
            console.error(err);
            alert(err.response?.data?.message ?? "조회 중 오류가 발생했습니다.");
        });
    }, []);

    const onInit = () => {
        formSectionRef.current?.onInitForm();
    };

    return (
        <div className="px-6 py-3">
            <PageHeader>용지재고조회(인쇄소별)</PageHeader>
            <MonitorPrintFormSection
                ref={formSectionRef}
                paperCompanies={paperCompanies}
                printCompanies={printCompanies}
                papers={papers}
                isDetail={isDetail}
                onSearch={search}
                onDetailChange={setIsDetail}
            />
            <div className="grid gap-4 p-3 border border-white-500" style={{ gridTemplateColumns: '1fr 1fr 2fr' }}>
                <MonitorPrintFirstTable
                    isDetail={isDetail}
                    detail={response?.detail?.putinList ?? []}
                    summary={response?.summary?.putinList ?? []}
                />
                <MonitorPrintSecondTable
                    isDetail={isDetail}
                    detail={response?.detail?.deliveryList ?? []}
                    summary={response?.summary?.deliveryList ?? []}
                />
                <MonitorPrintThirdTable
                    isDetail={isDetail}
                    detail={response?.detail?.printList ?? []}
                    summary={response?.summary?.printList ?? []}
                />
            </div>
            <MonitorPrintButton
                statistics={response?.statistics}
                onInit={onInit}
            />
        </div>
    );
}
