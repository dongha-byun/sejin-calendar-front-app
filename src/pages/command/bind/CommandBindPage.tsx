import { useEffect, useState } from "react";
import type { CommandBindDto } from "../../../types/command/CommandBind";
import CommandBindFormSection from "./components/CommandBindFormSection";
import CommandBindTable from "./components/CommandBindTable";
import { commandBindApi } from "../../../api/command/commandBindApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";

export default function CommandBindPage() {
    const [commandBinds, setCommandBinds] = useState<CommandBindDto[]>([]);
    const [bindCompanies, setBindCompanies] = useState<CustomCompany[]>([]);
    const [printCompanies, setPrintCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);

    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Binding).then(setBindCompanies);
        customCompanyApi.list(CompanyType.Printing).then(setPrintCompanies);
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        commandBindApi.list().then(setCommandBinds);
    }

    const addCommandBind = (data: CommandBindDto) => {
        commandBindApi.save(data).then(() => {
            fetch();
        });
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 제본지시</h1>
            <CommandBindFormSection 
                onAdd={addCommandBind} 
                bindCompanies={bindCompanies} printCompanies={printCompanies}
                models={models}
            />
            <CommandBindTable data={commandBinds} />
        </div>
    );
}