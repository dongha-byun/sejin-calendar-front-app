import { useEffect, useState } from "react";
import type { CommandPaperDeliveryDto } from "../../../types/command/CommandPaperDelivery";
import CommandPaperDeliveryFormSection from "./components/CommandPaperDeliveryFormSection";
import CommandPaperDeliveryTable from "./components/CommandPaperDeliveryTable";
import { commandPaperDeliveryApi } from "../../../api/command/commandPaperDeliveryApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Paper } from "../../../types/baseinfo/Paper";
import { paperApi } from "../../../api/baseinfo/paperApi";


export default function CommandPaperDeliveryPage() {
    const [commandPaperDeliveries, setCommandPaperDeliveries] = useState<CommandPaperDeliveryDto[]>([]);
    const [paperCompanies, setPaperCompanies] = useState<CustomCompany[]>([]);
    const [printCompanies, setPrintCompanies] = useState<CustomCompany[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Paper).then(setPaperCompanies);
        customCompanyApi.list(CompanyType.Printing).then(setPrintCompanies);
        paperApi.list().then(setPapers);
    }, []);

    const fetch = () => {
        commandPaperDeliveryApi.list().then(setCommandPaperDeliveries);
    }

    const addCommandPaperDelivery = (commandPaperDelivery: CommandPaperDeliveryDto) => {
        commandPaperDeliveryApi.save(commandPaperDelivery).then(() => {
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 용지배송</h1>
            <CommandPaperDeliveryFormSection 
                onAdd={addCommandPaperDelivery} 
                paperCompanies={paperCompanies} 
                printCompanies={printCompanies} 
                papers={papers}
            />
            <CommandPaperDeliveryTable data={commandPaperDeliveries} />
        </div>
    );
}