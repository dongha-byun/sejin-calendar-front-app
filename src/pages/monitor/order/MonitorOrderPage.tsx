import { useEffect, useState } from "react";
import MonitorOrderFormSection from "./components/MonitorOrderFormSection";
import type { Order } from "../../../types/ordermanager/Order";
import MonitorOrderTable from "./components/MonitorOrderTable";
import MonitorOrderBottom from "./components/MonitorOrderBottom";


export default function MonitorOrderPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    
        
    useEffect(() => {
        const ordersSaved = localStorage.getItem("orders");
        if (ordersSaved) setOrders(JSON.parse(ordersSaved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">접수내역 조회</h1>
            <MonitorOrderFormSection />
            <MonitorOrderTable data={orders} />
            <MonitorOrderBottom />
        </div>
    );
}