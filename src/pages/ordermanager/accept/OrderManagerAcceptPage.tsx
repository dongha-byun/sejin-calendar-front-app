import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import OrderManagerAcceptFormSection from "./components/OrderManagerAcceptFormSection";
import OrderManagerAcceptTable from "./components/OrderManagerAcceptTable";

export default function OrderManagerAcceptPage () {
    const [orders, setOrders] = useState<Order[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem("orders");
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (order: Order) => {
        setOrders(prev => [...prev, order]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문접수</h1>
            <OrderManagerAcceptFormSection onAdd={addOrder} />
            <OrderManagerAcceptTable data={orders} />
        </div>
    );
}