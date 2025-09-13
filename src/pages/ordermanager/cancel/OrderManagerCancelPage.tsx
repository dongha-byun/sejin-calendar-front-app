import { useEffect, useState } from "react";
import OrderManagerCancelFormSection from "./components/OrderManagerCancelFormSection";
import OrderManagerCancelTable from "./components/OrderManagerCancelTable";
import type { OrderCancelSearch } from "../../../types/ordermanager/OrderCancelSearch";
import { orderApi } from "../../../api/ordermanager/orderApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import type { Model } from "../../../types/baseinfo/Model";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { modelApi } from "../../../api/baseinfo/modelApi";

interface SearchReq {
    customerName?: string;
    modelNum?: string;
    modelName: string;
    orderNum?: string;    
}

export default function OrderManagerCancelPage() {

    const [orders, setOrders] = useState<OrderCancelSearch[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CustomCompany>();
    const [selectedModel, setSelectedModel] = useState<Model>();
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [form, setForm] = useState<SearchReq>({
        modelName: ''
    });
        
    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        orderApi.searchOrderCancelList(
            selectedCompany?.name,
            selectedModel?.modelNum
        ).then((result) => {
            setOrders(result);
            setCheckedIds([]);
        });
    }

    useEffect(() => {
        fetch();
    },[selectedModel, selectedCompany]);

    const onInit = () => {
        setForm({
            customerName: undefined,
            modelNum: undefined,
            modelName: '',
            orderNum: undefined
        });
    };

    const checkOrder = (id: number, isChecked: boolean) => {
        if(isChecked) {
            setCheckedIds(prev => [...prev, id]);
        } else {
            setCheckedIds(prev => prev.filter(value => value !== id));
        }
    }

    const handleSubmit = () => {
        if(checkedIds.length === 0) {
            return;
        }

        if(window.confirm("선택한 주문을 취소 시키겠습니까?")) {
            orderApi.cancel(checkedIds).then(fetch);
        }
    }

    const onExit = () => {
        window.close();
    }
    
    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문취소</h1>
            <OrderManagerCancelFormSection 
                companies={companies} setSelectedCompany={setSelectedCompany}
                models={models} setSelectedModel={setSelectedModel}
                form={form} setForm={setForm}
            />
            <OrderManagerCancelTable data={orders} checkOrder={checkOrder} checkIds={checkedIds}/>

            <div className="mt-6 flex flex-col justify-center text-sm gap-3">
                <div className="flex gap-4">
                    <button onClick={onInit} className="min-w-[360px] px-3 py-1 ml-8 bg-gray-300 rounded hover:bg-gray-400">취소</button>
                    <button onClick={handleSubmit} className="min-w-[150px] px-3 py-1 ml-80 bg-gray-300 rounded hover:bg-gray-400">선택완료</button>
                    <button onClick={onExit} className="min-w-[120px] px-3 py-1 ml-20 bg-gray-300 rounded hover:bg-gray-400">종료</button>
                </div>
            </div>
        </div>
    );
}