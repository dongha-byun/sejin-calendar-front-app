import { useEffect, useState } from "react";
import type { PutinPaper } from "../../../types/putin/PutinPaper";
import type { CommandPaperDelivery } from "../../../types/command/CommandPaperDelivery";
import type { MonitorPrintThirdDto } from "../../../types/monitor/MonitorPrintThirdDto";
import MonitorPrintFormSection from "./components/MonitorPrintFormSection";
import MonitorPrintFirstTable from "./components/MonitorPrintFirstTable";
import MonitorPrintSecondTable from "./components/MonitorPrintSecondTable";
import MonitorPrintThirdTable from "./components/MonitorPrintThirdTable";
import MonitorPrintButton from "./components/MonitorPrintButton";


export default function MonitorPrintPage() {

    const [putinPapers, setPutinPapers] = useState<PutinPaper[]>([]);
    const [commandPaperDeliveries, setCommandPaperDeliveries] = useState<CommandPaperDelivery[]>([]);
    const [thirdData, setThirdData] = useState<MonitorPrintThirdDto[]>([]);
        
    useEffect(() => {
        const saved = localStorage.getItem("putinPapers");
        if (saved) setPutinPapers(JSON.parse(saved));

        const deliverySaved = localStorage.getItem("commandPaperDeliveries");
        if (deliverySaved) setCommandPaperDeliveries(JSON.parse(deliverySaved));

        const thirdDataSaved = localStorage.getItem("thirdData");
        if (thirdDataSaved) setThirdData(JSON.parse(thirdDataSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("putinPapers", JSON.stringify(putinPapers));
        localStorage.setItem("commandPaperDeliveries", JSON.stringify(commandPaperDeliveries));
        localStorage.setItem("thirdData", JSON.stringify(thirdData));
    }, [putinPapers, commandPaperDeliveries, thirdData]);

    return (
            <div className="px-6 py-3">
                <h1 className="text-base font-semibold pb-2">인쇄소별재고조회</h1>
                <MonitorPrintFormSection />
                <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                    <MonitorPrintFirstTable data={putinPapers} />
                    <MonitorPrintSecondTable data={commandPaperDeliveries} />
                    <MonitorPrintThirdTable data={thirdData} />
                </div>
                <MonitorPrintButton />
            </div>
        );
}