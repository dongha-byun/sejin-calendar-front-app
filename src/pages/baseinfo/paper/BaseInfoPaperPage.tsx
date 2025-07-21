import { useEffect, useState } from "react";
import type { Paper } from "../../../types/baseinfo/Paper";
import PaperFormSection from "./components/PaperFormSection";
import PaperTable from "./components/PaperTable";

export default function BaseInfoPaperPage() {
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("papers");
        if (saved) setPapers(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("papers", JSON.stringify(papers));
    }, [papers]);

    const addPaper = (paper: Paper) => {
        setPapers(prev => [...prev, paper]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">기초자료등록 - 용지</h1>
            <PaperFormSection onAdd={addPaper} />
            <PaperTable data={papers} />
        </div>
    );
}