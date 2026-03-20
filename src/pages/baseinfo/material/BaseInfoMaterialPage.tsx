import { useEffect, useState } from "react";
import { BindMethod, type Material } from "../../../types/baseinfo/Material";
import MaterialFormSection from "./component/MaterialFormSection";
import MaterialTable from "./component/MaterialTable";
import { materialApi } from "../../../api/baseinfo/materialApi";
import PageHeader from "../../../component/layout/PageHeader";

export default function BaseInfoMaterialPage() {
    const [bindMethod, setBindMethod] = useState<BindMethod>(BindMethod.IRON);
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        fetch();
    }, [bindMethod]);

    const fetch = () => {
        materialApi.list(bindMethod).then(setMaterials);
    }

    const onChangeBindMethod = (type: BindMethod) => {
        setBindMethod(type);
    }

    const addMaterial = (material: Material) => {
        materialApi.save(material).then(() => {
            fetch()
        });
    };

    return (
        <div className="px-6 py-3">
            <PageHeader>기초자료등록 - 원자재</PageHeader>
            <MaterialFormSection onChangeBindMethod={onChangeBindMethod} onAdd={addMaterial} list={materials}/>
            <MaterialTable data={materials} />
        </div>
      );
}