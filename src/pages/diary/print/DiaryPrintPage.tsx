import { useEffect, useState } from "react";
import type { DiaryPrint } from "../../../types/diary/DiaryPrint";
import DiaryPrintFormSection from "./components/DiaryPrintFormSection";
import DiaryPrintTable from "./components/DiaryPrintTable";

export default function DiaryPrintPage() {
    const [diaryPrints, setDiaryPrints] = useState<DiaryPrint[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("diaryPrints");
        if (saved) setDiaryPrints(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("diaryPrints", JSON.stringify(diaryPrints));
    }, [diaryPrints]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 인쇄물입고</h1>
            <DiaryPrintFormSection />
            <DiaryPrintTable data={diaryPrints} />
        </div>
    );
}