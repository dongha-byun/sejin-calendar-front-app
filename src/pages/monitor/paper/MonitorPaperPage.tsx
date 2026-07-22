import { useCallback, useEffect, useRef, useState } from "react";
import MonitorPaperFormSection, { type MonitorPaperFormSectionRef, type MonitorPaperStockRequest } from "./components/MonitorPaperFormSection";
import MonitorPaperPrice from "./components/MonitorPaperPrice";
import MonitorPaperCompany from "./components/MonitorPaperCompany";
import MonitorPaperCommandPrintList from "./components/MonitorPaperCommandPrintList";
import MonitorPaperButton from "./components/MonitorPaperButton";
import PageHeader from "../../../component/layout/PageHeader";
import type { MonitorPaperStockResponse } from "../../../types/monitor/MonitorPaperStockResponse";
import { monitorPaperApi } from "../../../api/monitor/monitorPaperApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { paperApi } from "../../../api/baseinfo/paperApi";
import type { Paper } from "../../../types/baseinfo/Paper";

export default function MonitorPaperPage() {
    const [response, setResponse] = useState<MonitorPaperStockResponse>();
    const [paperCompanies, setPaperCompanies] = useState<CustomCompany[]>([]);
    const [printCompanies, setPrintCompanies] = useState<CustomCompany[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);
    const formSectionRef = useRef<MonitorPaperFormSectionRef | null>(null);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Paper).then(setPaperCompanies);
        customCompanyApi.list(CompanyType.Printing).then(setPrintCompanies);
        paperApi.list().then(setPapers);
        search({});
    }, []);

    const search = useCallback((req: Partial<MonitorPaperStockRequest>) => {
        monitorPaperApi.search(req).then(setResponse).catch(err => {
            console.error(err);
            alert(err.response?.data?.message ?? "조회 중 오류가 발생했습니다.");
        });
    }, []);

    const onInit = () => {
        formSectionRef.current?.onInitForm();
    };

    return (
        <div className="px-6 py-3">
            <PageHeader>용지재고조회(용지별)</PageHeader>
            <MonitorPaperFormSection
                ref={formSectionRef}
                paperCompanies={paperCompanies}
                printCompanies={printCompanies}
                papers={papers}
                onSearch={search}
            />
            <div className="grid gap-4 p-3 border border-white-500" style={{ gridTemplateColumns: '1fr 1fr 2fr' }}>
                <MonitorPaperPrice data={response?.detail.putinList ?? []} />
                <MonitorPaperCompany data={response?.detail.commandDeliveryList ?? []} />
                <MonitorPaperCommandPrintList data={response?.detail.commandPrintList ?? []} />
            </div>
            <MonitorPaperButton
                statistics={response?.paperStockStatistics}
                onInit={onInit}
            />
        </div>
    );
}
