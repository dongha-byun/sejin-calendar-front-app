import { useEffect, useState } from "react";
import type { DiaryPrint } from "../../../types/diary/DiaryPrint";
import DiaryPrintFormSection from "./components/DiaryPrintFormSection";
import DiaryPrintTable from "./components/DiaryPrintTable";
import type { Model } from "../../../types/baseinfo/Model";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { commandPrintApi } from "../../../api/command/commandPrintApi";
import type { CommandPrint } from "../../../types/command/CommandPrint";

export default function DiaryPrintPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    useEffect(() => {
        search();
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Printing).then(setCompanies);
    }, []);

    const search = (companyName?: string, modelNum?: string) => {
        commandPrintApi.search(companyName, modelNum).then(setCommandPrints);
    }

    const onCheckId = (isChecked: boolean, id?: number) => {
        if(id) {
            if(isChecked) {
                setCheckedIds(prev => [...prev, id]);
            } else {
                setCheckedIds(prev => prev.filter(n => n !== id));
            }
        }
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 인쇄물입고</h1>
            <DiaryPrintFormSection models={models} companies={companies} searchFunc={search} />
            <DiaryPrintTable data={commandPrints} onCheckId={onCheckId} />
        </div>
    );
}