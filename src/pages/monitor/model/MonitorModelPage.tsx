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

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">호별 생산 내역 조회</h1>
            <MonitorModelFormSection models={models} onSearch={search} />
            <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                <MonitorModelPrintHistory data={searchResponse?.printInfo || EMPTY_HISTORY} />
                <MonitorModelMachineHistory data={searchResponse?.machineInfo || EMPTY_HISTORY} />
                <MonitorModelBindHistory data={searchResponse?.bindInfo || EMPTY_HISTORY}/>
            </div>
            <MonitorModelButton />
        </div>
    );
}