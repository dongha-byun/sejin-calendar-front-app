import { useEffect, useState } from "react";
import type { CommandPrint } from "../../../types/command/CommandPrint";
import CommandPrintFormSection from "./components/CommandPrintFormSection";
import CommandPrintTable from "./components/CommandPrintTable";


export default function CommandPrintPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("commandPrints");
        if (saved) setCommandPrints(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("commandPrints", JSON.stringify(commandPrints));
    }, [commandPrints]);

    const addCommandPrint = (commandPrint: CommandPrint) => {
        setCommandPrints(prev => [...prev, commandPrint]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 인쇄지시</h1>
            <CommandPrintFormSection onAdd={addCommandPrint} />
            <CommandPrintTable data={commandPrints} />
        </div>
    );
}