import { useEffect, useState } from "react";
import type { EtcSampleDto } from "../../../types/etc/EtcSample";
import type { Model } from "../../../types/baseinfo/Model";
import { etcSampleApi } from "../../../api/etc/etcSampleApi";
import { modelApi } from "../../../api/baseinfo/modelApi";
import PageHeader from "../../../component/layout/PageHeader";
import EtcSampleFormSection from "./components/EtcSampleFormSection";
import EtcSampleTable from "./components/EtcSampleTable";

export default function EtcSamplePage() {
    const [samples, setSamples] = useState<EtcSampleDto[]>([]);
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        fetch();
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        etcSampleApi.list().then(setSamples);
    };

    const addSample = (data: EtcSampleDto) => {
        etcSampleApi.save(data).then(() => {
            fetch();
        });
    };

    return (
        <div className="h-full flex flex-col px-6 py-3 overflow-hidden">
            <div className="shrink-0">
                <PageHeader>기타작업 - 견본</PageHeader>
                <EtcSampleFormSection onAdd={addSample} models={models} />
            </div>
            <div className="flex-1 min-h-0">
                <EtcSampleTable data={samples} />
            </div>
        </div>
    );
}
