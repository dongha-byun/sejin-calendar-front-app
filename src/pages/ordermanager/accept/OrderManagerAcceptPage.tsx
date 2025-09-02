import { useEffect, useState } from "react";
import type { Order, OrderCreateRequestDto } from "../../../types/ordermanager/Order";
import OrderManagerAcceptFormSection from "./components/OrderManagerAcceptFormSection";
import OrderManagerAcceptTable from "./components/OrderManagerAcceptTable";
import { orderApi } from "../../../api/ordermanager/orderApi";
import type { Model } from "../../../types/baseinfo/Model";
import { modelApi } from "../../../api/baseinfo/modelApi";

export default function OrderManagerAcceptPage () {
    const [orders, setOrders] = useState<Order[]>([]);
    const [models, setModels] = useState<Model[]>([]);
    
    useEffect(() => {
        fetch();
        modelApi.list().then(setModels);
    }, []);

    const fetch = () => {
        orderApi.list().then(setOrders);
    }

    const addOrder = (order: OrderCreateRequestDto) => {
        orderApi.save(order).then(() => {
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문접수</h1>
            <OrderManagerAcceptFormSection 
                onAdd={addOrder} models={models}
            />
            <OrderManagerAcceptTable data={orders} />
        </div>
    );
}