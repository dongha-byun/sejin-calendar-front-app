import { useCallback, useEffect, useState } from "react";
import PageHeader from "../../../component/layout/PageHeader";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { etcRevenueApi } from "../../../api/etc/etcRevenueApi";
import type { EtcRevenueQuery, EtcRevenueRow, EtcRevenueSummaryData } from "../../../types/etc/EtcRevenue";
import { emptyRevenueSummary } from "../../../types/etc/EtcRevenue";
import EtcRevenueFormSection from "./components/EtcRevenueFormSection";
import EtcRevenueTable from "./components/EtcRevenueTable";
import EtcRevenueSummary from "./components/EtcRevenueSummary";

export default function EtcRevenuePage() {
    const [rows, setRows] = useState<EtcRevenueRow[]>([]);
    const [summary, setSummary] = useState<EtcRevenueSummaryData>(emptyRevenueSummary);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);

    const fetchRevenue = useCallback(async (query: EtcRevenueQuery) => {
        etcRevenueApi.list(query)
            .then(setRows)
            .catch((err) => {
                console.error('[매출현황] 목록 조회 실패', err);
                setRows([]);
            });

        etcRevenueApi.summary(query)
            .then(setSummary)
            .catch((err) => {
                console.error('[매출현황] 집계 조회 실패', err);
                setSummary(emptyRevenueSummary);
            });
    }, []);

    useEffect(() => {
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
    }, []);

    return (
        <div className="px-6 py-3">
            <PageHeader>기타작업 - 매출현황</PageHeader>
            <EtcRevenueFormSection
                models={models}
                companies={companies}
                onSearch={fetchRevenue}
            />
            <EtcRevenueTable data={rows} />
            <EtcRevenueSummary summary={summary} />
        </div>
    );
}
