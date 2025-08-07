import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import OrderManagerReturnsFormSection from "./components/OrderManagerReturnsFormSection";
import OrderManagerReturnsTable from "./components/OrderManagerReturnsTable";

export default function OrderManagerCancelPage() {

    const [orders, setOrders] = useState<Order[]>([]);
        
    useEffect(() => {
        const saved = localStorage.getItem("orders");
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">주문반품</h1>
            <OrderManagerReturnsFormSection />
            <OrderManagerReturnsTable data={orders} />
        </div>
    );
}