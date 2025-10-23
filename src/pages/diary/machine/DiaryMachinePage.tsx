import { useEffect, useState } from "react";
import type { DiaryMachine } from "../../../types/diary/DiaryMachine";
import DiaryMachineTable from "./components/DiaryMachineTable";
import DiaryMachineFormSection from "./components/DiaryMachineFormSection";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { printCnSearchApi } from "../../../api/ordermanager/PrintCnApi";
import { diaryMachineApi } from "../../../api/diary/diaryMachineApi";


export default function DiaryMachinePage() {
    const [diaryMachines, setDiaryMachines] = useState<DiaryMachine[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [printCnList, setPrintCnList] = useState<string[]>([]);

    useEffect(() => {
        fetch();
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        diaryMachineApi.list().then(setDiaryMachines);
    }

    const onChangeModel = (modelNum: string) => {
        // 모델 번호에 따른 상호명 리스트 재조회
        printCnSearchApi.searchPrintCnList(modelNum).then((data) => {
            setPrintCnList(data.map(item => item.printCn));
        });
    }

    const addDiaryMachine = (diaryMachine: DiaryMachine) => {
        diaryMachineApi.create(diaryMachine).then(() => {
            console.log("정합 등록 완료");
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 정합</h1>
            <DiaryMachineFormSection onAdd={addDiaryMachine} models={models} onChangeModel={onChangeModel} printCnList={printCnList} />
            <DiaryMachineTable data={diaryMachines} />
        </div>
    );
}