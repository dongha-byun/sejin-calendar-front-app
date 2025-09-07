import { useEffect, useState } from "react";
import type { OrderCreateRequestDto, OrderDto } from "../../../types/ordermanager/Order";
import OrderManagerAcceptFormSection from "./components/OrderManagerAcceptFormSection";
import OrderManagerAcceptTable from "./components/OrderManagerAcceptTable";
import { orderApi } from "../../../api/ordermanager/orderApi";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";

export default function OrderManagerAcceptPage () {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [nextOrderNum, setNextOrderNum] = useState<string>('');
    
    useEffect(() => {
        fetch();
        getNextOrderNum();
        modelApi.list().then(setModels);
        customCompanyApi.list(CompanyType.Agency).then(setCompanies);
    }, []);

    const fetch = () => {
        orderApi.list().then(data => {
            setOrders(data);
        });
    }

    const getNextReleaseNum = (callbackFun: (r_num: string) => void) => {
        orderApi.nextReleaseNum().then((result) => {
            console.log(result);
            callbackFun(result.nextReleaseNum);
        });
    }

    const getNextOrderNum = () => {
        orderApi.nextOrderNum().then((result) => {
            setNextOrderNum(result.nextOrderNum);
        });
    }

    const addOrder = (order: OrderCreateRequestDto, onSuccess: () => void) => {
        orderApi.save(order)
            .then(() => {
                onSuccess();
                fetch();
                getNextOrderNum();
            });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문접수</h1>
            <OrderManagerAcceptFormSection 
                onAdd={addOrder} models={models} companies={companies}
                nextOrderNum={nextOrderNum} getNextReleaseNumFunc={getNextReleaseNum}
            />
            <OrderManagerAcceptTable data={orders} />
        </div>
    );
}