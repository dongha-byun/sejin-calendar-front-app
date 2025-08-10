import { useEffect, useState } from "react";
import MonitorPaperFormSection from "./components/MonitorPaperFormSection";
import type { CommandPaperDelivery } from "../../../types/command/CommandPaperDelivery";
import type { PutinPaper } from "../../../types/putin/PutinPaper";
import MonitorPaperPrice from "./components/MonitorPaperPrice";
import MonitorPaperCompany from "./components/MonitorPaperCompany";
import MonitorPaperButton from "./components/MonitorPaperButton";
import type { CommandPrint } from "../../../types/command/CommandPrint";
import MonitorPaperCommandPrintList from "./components/MonitorPaperCommandPrintList";

export default function MonitorPaperPage() {
    const [putinPapers, setPutinPapers] = useState<PutinPaper[]>([]);
    const [commandPaperDeliveries, setCommandPaperDeliveries] = useState<CommandPaperDelivery[]>([]);
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);
        
    useEffect(() => {
        const saved = localStorage.getItem("putinPapers");
        if (saved) setPutinPapers(JSON.parse(saved));

        const deliverySaved = localStorage.getItem("commandPaperDeliveries");
        if (deliverySaved) setCommandPaperDeliveries(JSON.parse(deliverySaved));

        const commandPrintsSaved = localStorage.getItem("commandPrints");
        if (commandPrintsSaved) setCommandPrints(JSON.parse(commandPrintsSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("putinPapers", JSON.stringify(putinPapers));
        localStorage.setItem("commandPaperDeliveries", JSON.stringify(commandPaperDeliveries));
        localStorage.setItem("commandPrints", JSON.stringify(commandPrints));
    }, [putinPapers, commandPaperDeliveries, commandPrints]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">용지재고조회(용지별)</h1>
            <MonitorPaperFormSection />
            <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                <MonitorPaperPrice data={putinPapers} />
                <MonitorPaperCompany data={commandPaperDeliveries} />
                <MonitorPaperCommandPrintList data={commandPrints} />
            </div>
            <MonitorPaperButton />
        </div>
    );
}