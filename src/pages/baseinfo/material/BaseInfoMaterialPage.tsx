import { useEffect, useState } from "react";
import type { Material } from "../../../types/baseinfo/Material";
import MaterialFormSection from "./component/MaterialFormSection";
import MaterialTable from "./component/MaterialTable";

export default function BaseInfoMaterialPage() {
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("materials");
        if (saved) setMaterials(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("materials", JSON.stringify(materials));
    }, [materials]);

    const addMaterial = (material: Material) => {
        setMaterials(prev => [...prev, material]);
    };

    return (
        <div className="p-6">
          <h1 className="text-xl font-bold mb-4">원자재 등록</h1>
          <MaterialFormSection onAdd={addMaterial} />
          <MaterialTable data={materials} />
        </div>
      );
}