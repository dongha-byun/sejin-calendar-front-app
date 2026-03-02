import { useCallback, useEffect, useRef, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import type { Model } from "../../../types/baseinfo/Model";
import type { CustomCompany } from "../../../types/baseinfo/CustomCompany";
import OrderManagerReturnsFormSection, { type OrderManagerReturnsFormSectionRef } from "./components/OrderManagerReturnsFormSection";
import OrderManagerReturnsTable from "./components/OrderManagerReturnsTable";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { orderApi } from "../../../api/ordermanager/orderApi";
import { CompanyType } from "../../../types/baseinfo/CustomCompany";

export default function OrderManagerCancelPage() {

    const [orders, setOrders] = useState<Order[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [searchOrder, setSearchOrder] = useState<Order | undefined>();
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const formSectionRef = useRef<OrderManagerReturnsFormSectionRef>(null);
        
    useEffect(() => {
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
    }, []);

    const searchOrders = useCallback((customerName?: string) => {
        const param = customerName && customerName !== "모두" ? customerName : undefined;
        orderApi.listReturns(param).then(setOrders);
    }, []);

    const focusOrder = (orderNum: string) => {
        const findOrder = orders.find(order => order.orderNum.toString() === orderNum);
        setSearchOrder(findOrder);
    };

    const onInit = () => {
        setSearchOrder(undefined);
        setCheckedIds([]);
    };

    const checkOrder = (id: number, isChecked: boolean) => {
        if (isChecked) {
            setCheckedIds(prev => [...prev, id]);
        } else {
            setCheckedIds(prev => prev.filter(x => x !== id));
        }
    };

    const handleSubmit = () => {
        const orderIds = checkedIds.filter(id => id != null && id > 0);
        if (orderIds.length === 0) {
            alert("선택된 항목이 없습니다.");
            return;
        }
        orderApi.submitReturns(orderIds).then(() => {
            setCheckedIds([]);
            formSectionRef.current?.refreshSearch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문반품</h1>
            <OrderManagerReturnsFormSection 
                ref={formSectionRef}
                models={models} 
                companies={companies} 
                searchOrders={searchOrders}
                focusOrder={focusOrder}
                onInit={onInit}
                onSubmit={handleSubmit}
            />
            <OrderManagerReturnsTable 
                data={orders} 
                searchOrder={searchOrder} 
                checkedIds={checkedIds}
                checkOrder={checkOrder}
            />
        </div>
    );
}