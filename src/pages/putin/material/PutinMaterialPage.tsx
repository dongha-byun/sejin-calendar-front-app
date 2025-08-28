import { useEffect, useState } from "react";
import type { PutinMaterialDto } from "../../../types/putin/PutinMaterial";
import PutinMaterialFormSection from "./components/PutinMaterialFormSection";
import PutinMaterialTable from "./components/PutinMaterialTable";
import { putinMaterialApi } from "../../../api/putin/putinMaterialApi";
import { BindMethod, type Material } from "../../../types/baseinfo/Material";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { materialApi } from "../../../api/baseinfo/materialApi";


export default function PutinMaterialPage() {
    const [putinMaterials, setPutinMaterials] = useState<PutinMaterialDto[]>([]);
    const [selectedBindMethod, setSelectedBindMethod] = useState<BindMethod>(BindMethod.IRON);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Material).then(setCompanies);
    }, []);

    useEffect(() => {
        fetch();
        materialApi.list(selectedBindMethod).then(setMaterials);
    }, [selectedBindMethod]);

    const fetch = () => {
        putinMaterialApi.list(selectedBindMethod).then(setPutinMaterials);
    }

    const addPutinMaterial = (putinMaterial: PutinMaterialDto) => {
        putinMaterialApi.save(putinMaterial).then(() => {
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재입고 - 원자재</h1>
            <PutinMaterialFormSection 
                onAdd={addPutinMaterial} 
                selectedBindMethod={selectedBindMethod} setSelectedBindMethod={setSelectedBindMethod} 
                companies={companies} materials={materials} />
            <PutinMaterialTable data={putinMaterials} />
        </div>
    );
}