import { useEffect, useState } from "react";
import type { Model } from "../../../types/baseinfo/Model";
import ModelFormSection from "./components/ModelFormSection";
import ModelTable from "./components/ModelTable";

export default function BaseInfoModelPage() {
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("models");
        if (saved) setModels(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("models", JSON.stringify(models));
    }, [models]);

    const addModel = (model: Model) => {
        setModels(prev => [...prev, model]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">기초자료등록 - Model</h1>
            <ModelFormSection onAdd={addModel} />
            <ModelTable data={models} />
        </div>
    );
}