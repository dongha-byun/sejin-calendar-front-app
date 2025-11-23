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
import type { CommandableQuantityDto } from "../../../types/command/CommandPrint";


export default function CommandPrintPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrintDto[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);
    const [nextStatementNum, setNextStatementNum] = useState<string>('');
    const [coverCommandableQuantity, setCoverCommandableQuantity] = useState<CommandableQuantityDto>({
        quantity: 0 
    });
    const [innerCommandableQuantity, setInnerCommandableQuantity] = useState<CommandableQuantityDto>({
        quantity: 0 
    });

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

    const fetchCommandableQuantity = (printCompanyName: string, weight: number, properties: string, standard: string, type: 'cover' | 'inner') => {
        commandPrintApi.getCommandableQuantity(printCompanyName, weight, properties, standard, type).then(result => {
            if (type === 'cover') {
                setCoverCommandableQuantity(result);
            } else {
                setInnerCommandableQuantity(result);
            }
        });
    }

    const addCommandPrint = (commandPrint: CommandPrintDto) => {
        commandPrintApi.save(commandPrint).then(() => {
            fetch();
            loadNextStatementNum();
        });
    };

    return (
        <div className="px-6 py-3">
            <CommandPrintFormSection 
                onAdd={addCommandPrint} companies={companies} models={models} papers={papers}
                nextStatementNum={nextStatementNum}
                coverCommandableQuantity={coverCommandableQuantity}
                innerCommandableQuantity={innerCommandableQuantity}
                fetchCommandableQuantity={fetchCommandableQuantity}
            />
            <CommandPrintTable data={commandPrints} />
        </div>
    );
}