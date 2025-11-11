import { useEffect, useState } from "react";
import type { CommandPrintDto } from "../../../types/command/CommandPrint";
import CommandPrintFormSection from "./components/CommandPrintFormSection";
import CommandPrintTable from "./components/CommandPrintTable";
import { commandPrintApi } from "../../../api/command/commandPrintApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import type { Paper } from "../../../types/baseinfo/Paper";
import { paperApi } from "../../../api/baseinfo/paperApi";


export default function CommandPrintPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrintDto[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [nextStatementNum, setNextStatementNum] = useState<string>('');

    useEffect(() => {
        fetch();
        loadNextStatementNum();
        customCompanyApi.list(CompanyType.Printing).then(setCompanies);
        modelApi.list().then(setModels);
        paperApi.list().then(setPapers);
    }, []);

    const fetch = () => {
        commandPrintApi.list().then(setCommandPrints);
    }

    const loadNextStatementNum = () => {
        commandPrintApi.getNextStatementNum().then(setNextStatementNum);
    }

    const addCommandPrint = (commandPrint: CommandPrintDto) => {
        commandPrintApi.save(commandPrint).then(() => {
            fetch();
            loadNextStatementNum();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 인쇄지시</h1>
            <CommandPrintFormSection 
                onAdd={addCommandPrint} companies={companies} models={models} papers={papers}
                nextStatementNum={nextStatementNum}
            />
            <CommandPrintTable data={commandPrints} />
        </div>
    );
}