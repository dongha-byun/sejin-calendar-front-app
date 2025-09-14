import { useEffect, useState } from "react";
import DiaryPrintFormSection from "./components/DiaryPrintFormSection";
import DiaryPrintTable from "./components/DiaryPrintTable";
import type { Model } from "../../../types/baseinfo/Model";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { commandPrintApi } from "../../../api/command/commandPrintApi";
import type { CommandPrint } from "../../../types/command/CommandPrint";

export interface SearchReqForDiaryPrintPage {
    modelNum: string;
    printCompanyName: string;
}

export default function DiaryPrintPage() {
    const [form, setForm] = useState<SearchReqForDiaryPrintPage>({
        modelNum: '',
        printCompanyName: '',
    });
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);

    useEffect(() => {
        search();
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Printing).then(setCompanies);
    }, []);

    const search = (companyName?: string, modelNum?: string) => {
        commandPrintApi.search(companyName, modelNum).then(setCommandPrints);
    }

    const onCheckId = (isChecked: boolean, id?: number) => {
        if(id) {
            if(isChecked) {
                setCheckedIds(prev => [...prev, id]);
            } else {
                setCheckedIds(prev => prev.filter(n => n !== id));
            }
        }
    }

    const onCancel = () => {
        setForm({
            modelNum: '',
            printCompanyName: ''
        });
    }

    const handleSubmit = () => {
        console.log('선택완료 버튼 눌림');
    }

    const onExit = () => {
        window.close();
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 인쇄물입고</h1>
            <DiaryPrintFormSection 
                models={models} companies={companies} searchFunc={search} 
                form={form} setForm={setForm}
            />
            <DiaryPrintTable data={commandPrints} onCheckId={onCheckId} />
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택완료</button>
                <button onClick={onExit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">종료</button>
            </div>
        </div>
    );
}