import { useEffect, useState } from "react";
import type { PutinPaperDto } from "../../../types/putin/PutinPaper";
import PutinPaperTable from "./components/PutinPaperTable";
import PutinPaperFormSection from "./components/PutinPaperFormSection";
import { putinPaperApi } from "../../../api/putin/putinPaperApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Paper } from "../../../types/baseinfo/Paper";
import { paperApi } from "../../../api/baseinfo/paperApi";


export default function PutinPaperPage() {
    const [putinPapers, setPutinPapers] = useState<PutinPaperDto[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Paper).then(setCompanies);
        paperApi.list().then(setPapers);
    }, []);

    const fetch = () => {
        putinPaperApi.list().then(setPutinPapers);
    }

    const addPutinPaper = (putinPaper: PutinPaperDto) => {
        putinPaperApi.save(putinPaper).then(() => {
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재입고 - 용지</h1>
            <PutinPaperFormSection onAdd={addPutinPaper} 
                companies={companies} papers={papers}/>
            <PutinPaperTable data={putinPapers} />
        </div>
    );
}