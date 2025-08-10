import { useEffect, useState } from "react";
import MonitorModelFormSection from "./components/MonitorModelFormSection";
import MonitorModelButton from "./components/MonitorModelButton";
import type { CommandPrint } from "../../../types/command/CommandPrint";
import MonitorModelPrintHistory from "./components/MonitorModelPrintHistory";
import MonitorModelMachineHistory from "./components/MonitorModelMachineHistory";
import type { DiaryMachine } from "../../../types/diary/DiaryMachine";
import MonitorModelBindHistory from "./components/MonitorModelBindHistory";
import type { DiaryBind } from "../../../types/diary/DiaryBind";

export default function MonitorPaperPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);
    const [diaryMachine, setDiaryMachine] = useState<DiaryMachine[]>([]);
    const [diaryBinds, setDiaryBinds] = useState<DiaryBind[]>([]);
    
        
    useEffect(() => {
        const diaryMachineSaved = localStorage.getItem("diaryMachine");
        if (diaryMachineSaved) setDiaryMachine(JSON.parse(diaryMachineSaved));

        const diaryBindSaved = localStorage.getItem("diaryBinds");
        if (diaryBindSaved) setDiaryBinds(JSON.parse(diaryBindSaved));

        const commandPrintsSaved = localStorage.getItem("commandPrints");
        if (commandPrintsSaved) setCommandPrints(JSON.parse(commandPrintsSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("diaryMachine", JSON.stringify(diaryMachine));
        localStorage.setItem("diaryBinds", JSON.stringify(diaryBinds));
        localStorage.setItem("commandPrints", JSON.stringify(commandPrints));
    }, [diaryMachine, diaryBinds, commandPrints]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">호별 생산 내역 조회</h1>
            <MonitorModelFormSection />
            <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                <MonitorModelPrintHistory data={commandPrints} />
                <MonitorModelMachineHistory data={diaryMachine} />
                <MonitorModelBindHistory data={diaryBinds}/>
            </div>
            <MonitorModelButton />
        </div>
    );
}