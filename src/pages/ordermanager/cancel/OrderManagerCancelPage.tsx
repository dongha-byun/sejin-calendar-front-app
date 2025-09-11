import { useEffect, useState } from "react";
import OrderManagerCancelFormSection from "./components/OrderManagerCancelFormSection";
import OrderManagerCancelTable from "./components/OrderManagerCancelTable";
import type { OrderCancelSearch } from "../../../types/ordermanager/OrderCancelSearch";
import { orderApi } from "../../../api/ordermanager/orderApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import type { Model } from "../../../types/baseinfo/Model";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { modelApi } from "../../../api/baseinfo/modelApi";

export default function OrderManagerCancelPage() {

    const [orders, setOrders] = useState<OrderCancelSearch[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<CustomCompany>();
    const [selectedModel, setSelectedModel] = useState<Model>();
        
    useEffect(() => {
        fetch();
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        orderApi.searchOrderCancelList(
            selectedCompany?.name,
            selectedModel?.modelNum
        ).then(setOrders);
    }

    useEffect(() => {
        console.log(selectedModel);
        fetch();
    },[selectedModel, selectedCompany]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문취소</h1>
            <OrderManagerCancelFormSection 
                companies={companies} setSelectedCompany={setSelectedCompany}
                models={models} setSelectedModel={setSelectedModel}
            />
            <OrderManagerCancelTable data={orders} />
        </div>
    );
}