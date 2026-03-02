import { useCallback, useEffect, useRef, useState } from "react";
import DiaryPrintFormSection, { type DiaryPrintFormSectionRef } from "./components/DiaryPrintFormSection";
import DiaryPrintTable from "./components/DiaryPrintTable";
import type { Model } from "../../../types/baseinfo/Model";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { commandPrintApi } from "../../../api/command/commandPrintApi";
import type { CommandPrint } from "../../../types/command/CommandPrint";
import { diaryPrintApi } from "../../../api/diary/diaryPrintApi";

export default function DiaryPrintPage() {
    const [commandPrints, setCommandPrints] = useState<CommandPrint[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const formSectionRef = useRef<DiaryPrintFormSectionRef>(null);

    useEffect(() => {
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Printing).then(setCompanies);
    }, []);

    const searchFunc = useCallback((companyName?: string, modelNum?: string) => {
        commandPrintApi.search(companyName, modelNum).then(setCommandPrints);
    }, []);

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
        formSectionRef.current?.handleInit();
        setCheckedIds([]);
    }

    const handleSubmit = () => {
        if(checkedIds.length < 1) {
            alert("선택된 건이 없습니다.");
            return;
        }

        diaryPrintApi.create(checkedIds).then(() => formSectionRef.current?.refreshSearch());
    }

    const onExit = () => {
        window.close();
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 인쇄물입고</h1>
            <DiaryPrintFormSection 
                ref={formSectionRef}
                models={models} 
                companies={companies} 
                searchFunc={searchFunc}
            />
            <DiaryPrintTable data={commandPrints} onCheckId={onCheckId} checkedIds={checkedIds}/>
            <div className="flex my-2 items-center text-sm gap-3">
                <button onClick={onCancel} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                <button onClick={handleSubmit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">선택완료</button>
                <button onClick={onExit} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">종료</button>
            </div>
        </div>
    );
}