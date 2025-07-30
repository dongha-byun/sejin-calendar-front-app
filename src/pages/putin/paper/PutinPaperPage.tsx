import { useEffect, useState } from "react";
import type { PutinPaper } from "../../../types/putin/PutinPaper";
import PutinPaperTable from "./components/PutinPaperTable";
import PutinPaperFormSection from "./components/PutinPaperFormSection";


export default function PutinPaperPage() {
    const [putinPapers, setPutinPapers] = useState<PutinPaper[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("putinPapers");
        if (saved) setPutinPapers(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("putinPapers", JSON.stringify(putinPapers));
    }, [putinPapers]);

    const addPutinPaper = (putinPaper: PutinPaper) => {
        setPutinPapers(prev => [...prev, putinPaper]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재입고 - 용지</h1>
            <PutinPaperFormSection onAdd={addPutinPaper} />
            <PutinPaperTable data={putinPapers} />
        </div>
    );
}