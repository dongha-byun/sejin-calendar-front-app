import { useCallback, useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import type { Model } from "../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../types/baseinfo/CustomCompany";
import OrderManagerReturnsFormSection from "./components/OrderManagerReturnsFormSection";
import OrderManagerReturnsTable from "./components/OrderManagerReturnsTable";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { orderApi } from "../../../api/ordermanager/orderApi";
import { CompanyType } from "../../../types/baseinfo/CustomCompany";

export default function OrderManagerCancelPage() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
        
    useEffect(() => {
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
    }, []);

    const searchOrders = useCallback((customerName?: string) => {
        const param = customerName && customerName !== "모두" ? customerName : undefined;
        orderApi.listReturns(param).then(setOrders);
    }, []);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문반품</h1>
            <OrderManagerReturnsFormSection 
                models={models} 
                companies={companies} 
                searchOrders={searchOrders}
            />
            <OrderManagerReturnsTable data={orders} />
        </div>
    );
}