import { useEffect, useState } from "react";
import type { DiaryBind } from "../../../types/diary/DiaryBind";
import DiaryBindFormSection from "./components/DiaryBindFormSection";
import DiaryBindTable from "./components/DiaryBindTable";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { diaryBindApi } from "../../../api/diary/diaryBindApi";
import { printCnSearchApi } from "../../../api/ordermanager/printCnApi";

export default function DiaryBindPage() {
    const [diaryBinds, setDiaryBinds] = useState<DiaryBind[]>([]);
    const [bindCompanies, setBindCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [bindableQuantity, setBindableQuantity] = useState<number>(0);
    const [printCnList, setPrintCnList] = useState<string[]>([]);
    
    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Binding).then(setBindCompanies);
        modelApi.list().then(setModels);

    }, []);

    const fetch = () => {
        diaryBindApi.list().then(setDiaryBinds);
    }
    
    const getPrintCnList = (modelNum: string) => {
        printCnSearchApi.searchPrintCnList(modelNum).then(data => {
            setPrintCnList(data.map(item => item.printCn));
        });
    }

    const addDiaryBind = (diaryBind: DiaryBind) => {
        if(diaryBind.amount > bindableQuantity) {
            if(!confirm("제본 가능 수량보다 많습니다. \n그래도 제본하시겠습니까?")) {
                return ;
            }
        }
        diaryBindApi.create(diaryBind).then(() => {
            fetch();
        });
    };

    const getBindableQuantity = (modelNum: string) => {
        diaryBindApi.getBindableQuantity(modelNum).then((data) => {
            setBindableQuantity(data.quantity);
        });
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 제본</h1>
            <DiaryBindFormSection 
                onAdd={addDiaryBind}
                bindCompanies={bindCompanies} models={models} 
                printCnList={printCnList} getPrintCnList={getPrintCnList} listData={diaryBinds}
                getBindableQuantity={getBindableQuantity} bindableQuantity={bindableQuantity}
            />
            <DiaryBindTable data={diaryBinds} />
        </div>
    );
}