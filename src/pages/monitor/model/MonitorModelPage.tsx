import { useEffect, useState } from "react";
import MonitorModelFormSection from "./components/MonitorModelFormSection";
import MonitorModelButton from "./components/MonitorModelButton";
import MonitorModelPrintHistory from "./components/MonitorModelPrintHistory";
import MonitorModelMachineHistory from "./components/MonitorModelMachineHistory";
import MonitorModelBindHistory from "./components/MonitorModelBindHistory";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { monitorModelApi } from "../../../api/monitor/monitorModelApi";
import { EMPTY_HISTORY, type MonitorModelSearchResponse } from "../../../types/monitor/MonitorModelSearchResponse";
import PageHeader from "../../../component/layout/PageHeader";

export default function MonitorModelPage() {
    const [models, setModels] = useState<Model[]>([]);
    const [searchResponse, setSearchResponse] = useState<MonitorModelSearchResponse>();

    useEffect(() => {
        modelApi.list().then(setModels);
    }, []);

    const search = (modelNum: string) => {
        monitorModelApi.search(modelNum).then(res => {
            setSearchResponse(res);
        }).catch(error => {
            console.error(error);
            alert(error.response.data.message);
        });
    }

    const previewPrintContent = () => {
        alert("[인쇄 미리보기] 준비중 입니다.");
    }

    const doPrint = () => {
        alert("[인쇄] 준비중 입니다.");
    }

    return (
        <div className="px-6 py-3">
            <PageHeader>호별 생산 내역 조회</PageHeader>
            <MonitorModelFormSection models={models} onSearch={search} />
            <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                <MonitorModelPrintHistory data={searchResponse?.printInfo || EMPTY_HISTORY} />
                <MonitorModelMachineHistory data={searchResponse?.machineInfo || EMPTY_HISTORY} />
                <MonitorModelBindHistory data={searchResponse?.bindInfo || EMPTY_HISTORY}/>
            </div>
            <MonitorModelButton onPreviewPrintContent={previewPrintContent} onDoPrint={doPrint} />
        </div>
    );
}