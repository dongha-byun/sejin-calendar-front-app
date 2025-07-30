import { useEffect, useState } from "react";
import type { CommandPaperDelivery } from "../../../types/command/CommandPaperDelivery";
import CommandPaperDeliveryFormSection from "./components/CommandPaperDeliveryFormSection";
import CommandPaperDeliveryTable from "./components/CommandPaperDeliveryTable";


export default function CommandPaperDeliveryPage() {
    const [commandPaperDeliveries, setCommandPaperDeliveries] = useState<CommandPaperDelivery[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("commandPaperDeliveries");
        if (saved) setCommandPaperDeliveries(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("commandPaperDeliveries", JSON.stringify(commandPaperDeliveries));
    }, [commandPaperDeliveries]);

    const addCommandPaperDelivery = (commandPaperDelivery: CommandPaperDelivery) => {
        setCommandPaperDeliveries(prev => [...prev, commandPaperDelivery]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 용지배송</h1>
            <CommandPaperDeliveryFormSection onAdd={addCommandPaperDelivery} />
            <CommandPaperDeliveryTable data={commandPaperDeliveries} />
        </div>
    );
}