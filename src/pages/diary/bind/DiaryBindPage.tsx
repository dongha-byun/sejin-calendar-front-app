import { useEffect, useState } from "react";
import type { DiaryBind } from "../../../types/diary/DiaryBind";
import DiaryBindFormSection from "./components/DiaryBindFormSection";
import DiaryBindTable from "./components/DiaryBindTable";

export default function DiaryBindPage() {
    const [diaryBinds, setDiaryBinds] = useState<DiaryBind[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("diaryBinds");
        if (saved) setDiaryBinds(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("diaryBinds", JSON.stringify(diaryBinds));
    }, [diaryBinds]);

    const addDiaryBind = (diaryBind: DiaryBind) => {
        setDiaryBinds(prev => [...prev, diaryBind]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 인쇄지시</h1>
            <DiaryBindFormSection onAdd={addDiaryBind} />
            <DiaryBindTable data={diaryBinds} />
        </div>
    );
}