import { useEffect, useState } from "react";
import type { Model } from "../../../types/baseinfo/Model";
import ModelFormSection from "./components/ModelFormSection";
import ModelTable from "./components/ModelTable";
import { modelApi } from "../../../api/baseinfo/modelApi";
import type { Paper } from "../../../types/baseinfo/Paper";
import { paperApi } from "../../../api/baseinfo/paperApi";

export default function BaseInfoModelPage() {
    const [models, setModels] = useState<Model[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        fetchModel();
        fetchPaper();
    }, []);

    const fetchModel = () => {
        modelApi.list().then(setModels);
    }

    const fetchPaper = () => {
        paperApi.list().then(setPapers);
    };

    const addModel = (model: Model) => {
        modelApi.save(model).then(() => {
            fetchModel();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">기초자료등록 - Model</h1>
            <ModelFormSection onAdd={addModel} papers={papers} />
            <ModelTable data={models} />
        </div>
    );
}