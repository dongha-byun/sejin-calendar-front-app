import { useEffect, useState } from "react";
import type { DiaryMachine } from "../../../types/diary/DiaryMachine";
import DiaryMachineTable from "./components/DiaryMachineTable";
import DiaryMachineFormSection from "./components/DiaryMachineFormSection";


export default function DiaryMachinePage() {
    const [diaryMachines, setDiaryMachines] = useState<DiaryMachine[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("diaryMachines");
        if (saved) setDiaryMachines(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("diaryMachines", JSON.stringify(diaryMachines));
    }, [diaryMachines]);

    const addDiaryMachine = (diaryMachine: DiaryMachine) => {
        setDiaryMachines(prev => [...prev, diaryMachine]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 정합</h1>
            <DiaryMachineFormSection onAdd={addDiaryMachine} />
            <DiaryMachineTable data={diaryMachines} />
        </div>
    );
}