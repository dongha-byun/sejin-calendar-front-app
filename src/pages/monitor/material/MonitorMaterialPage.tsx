import { useEffect, useState } from "react";
import type { PutinMaterial } from "../../../types/putin/PutinMaterial";
import MonitorMaterialFormSection from "./components/MonitorMaterialFormSection";
import type { MonitorMaterialPresentDto } from "../../../types/monitor/MonitorMaterialPresentDto";
import MonitorMaterialQuantityTable from "./components/MonitorMaterialQuantityTable";
import MonitorMaterialPresentTable from "./components/MonitorMaterialPresentTable";
import MonitorMaterialButton from "./components/MonitorMaterialButton";

export default function MonitorMaterialPage() {

    const [putinMaterials, setPutinMaterials] = useState<PutinMaterial[]>([]);
    const [presents, setPresents] = useState<MonitorMaterialPresentDto[]>([]);
        
    useEffect(() => {
        const saved = localStorage.getItem("putinMaterials");
        if (saved) setPutinMaterials(JSON.parse(saved));

        const presentSaved = localStorage.getItem("presents");
        if (presentSaved) setPresents(JSON.parse(presentSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("putinMaterials", JSON.stringify(putinMaterials));
        localStorage.setItem("presents", JSON.stringify(presents));
    }, [putinMaterials, presents]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">원자재재고조회</h1>
            <MonitorMaterialFormSection />
            <div className="grid grid-cols-2 gap-4 p-3 border border-white-500">
                <MonitorMaterialQuantityTable data={putinMaterials} />
                <MonitorMaterialPresentTable data={presents} />
            </div>
            <MonitorMaterialButton />
        </div>
    );
}