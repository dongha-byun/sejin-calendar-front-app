import { useEffect, useState } from "react";
import type { PutinMaterial } from "../../../types/putin/PutinMaterial";
import PutinMaterialFormSection from "./components/PutinMaterialFormSection";
import PutinMaterialTable from "./components/PutinMaterialTable";


export default function PutinMaterialPage() {
    const [putinMaterials, setPutinMaterials] = useState<PutinMaterial[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("putinMaterials");
        if (saved) setPutinMaterials(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("putinMaterials", JSON.stringify(putinMaterials));
    }, [putinMaterials]);

    const addPutinMaterial = (putinMaterial: PutinMaterial) => {
        setPutinMaterials(prev => [...prev, putinMaterial]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재입고 - 원자재</h1>
            <PutinMaterialFormSection onAdd={addPutinMaterial} />
            <PutinMaterialTable data={putinMaterials} />
        </div>
    );
}