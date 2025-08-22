import { useEffect, useState } from "react";
import type { Paper } from "../../../types/baseinfo/Paper";
import PaperFormSection from "./components/PaperFormSection";
import PaperTable from "./components/PaperTable";
import { paperApi } from "../../../api/baseinfo/paperApi";

export default function BaseInfoPaperPage() {
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        paperApi.list().then(setPapers);
    };

    const addPaper = (paper: Paper) => {
        paperApi.save(paper).then(() => {
            fetch();
        }); 
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">기초자료등록 - 용지</h1>
            <PaperFormSection onAdd={addPaper} list={papers} />
            <PaperTable data={papers} />
        </div>
    );
}