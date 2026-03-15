import { useEffect, useState } from "react";
import MonitorMaterialFormSection from "./components/MonitorMaterialFormSection";
import MonitorMaterialQuantityTable from "./components/MonitorMaterialQuantityTable";
import MonitorMaterialPresentTable from "./components/MonitorMaterialPresentTable";
import MonitorMaterialBottom from "./components/MonitorMaterialBottom";
import type { CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { CompanyType } from "../../../types/baseinfo/CustomCompany";
import { type Material } from "../../../types/baseinfo/Material";
import { materialApi } from "../../../api/baseinfo/materialApi";
import type { MonitorMaterialSearchResponse } from "../../../types/monitor/MonitorMaterialSearchResponse";
import type { MonitorMaterialSearchRequest } from "./components/MonitorMaterialFormSection";
import { monitorMaterialApi } from "../../../api/monitor/monitorMaterialApi";

export default function MonitorMaterialPage() {
    const [searchResponse, setSearchResponse] = useState<MonitorMaterialSearchResponse>();
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);
    const [isDetailView, setIsDetailView] = useState(false);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Material).then(setCompanies);
        materialApi.list().then(setMaterials);
    }, []);

    const search = (form: MonitorMaterialSearchRequest) => {
        monitorMaterialApi.search(form).then(res => {
            setSearchResponse(res);
        }).catch(error => {
            console.error(error);
            alert(error.response.data.message);
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">원자재재고조회</h1>
            <MonitorMaterialFormSection
                companies={companies}
                materials={materials}
                onSearch={search}
                isDetailView={isDetailView}
                onDetailViewChange={setIsDetailView}
            />
            <div className="grid grid-cols-2 gap-4 p-3 border border-white-500 h-[400px]">
                <MonitorMaterialQuantityTable 
                    detailList={searchResponse?.putinDetailList || []} 
                    summaryList={searchResponse?.putinSummaryList || []} 
                    isDetailView={isDetailView} />
                <MonitorMaterialPresentTable 
                    detailList={searchResponse?.usageDetailList || []} 
                    summaryList={searchResponse?.usageSummaryList || []} 
                    isDetailView={isDetailView} />
            </div>
            <MonitorMaterialBottom 
                totalPutinAmount={searchResponse?.totalPutinAmount || 0} 
                totalUsageAmount={searchResponse?.totalUsageAmount || 0} 
                currentUsableAmount={searchResponse?.currentUsableAmount || 0} />
        </div>
    );
}