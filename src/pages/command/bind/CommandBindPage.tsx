import { useEffect, useState } from "react";
import type { CommandBind } from "../../../types/command/CommandBind";
import CommandBindFormSection from "./components/CommandBindFormSection";
import CommandBindTable from "./components/CommandBindTable";


export default function CommandBindPage() {
    const [commandBinds, setCommandBinds] = useState<CommandBind[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("commandBinds");
        if (saved) setCommandBinds(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("commandBinds", JSON.stringify(commandBinds));
    }, [commandBinds]);

    const addCommandBind = (commandBind: CommandBind) => {
        setCommandBinds(prev => [...prev, commandBind]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 용지배송</h1>
            <CommandBindFormSection onAdd={addCommandBind} />
            <CommandBindTable data={commandBinds} />
        </div>
    );
}