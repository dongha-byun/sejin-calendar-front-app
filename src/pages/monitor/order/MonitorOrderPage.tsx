import { useEffect, useState } from "react";
import MonitorOrderFormSection from "./components/MonitorOrderFormSection";
import type { Order } from "../../../types/ordermanager/Order";
import MonitorOrderTable from "./components/MonitorOrderTable";
import MonitorOrderBottom from "./components/MonitorOrderBottom";
import PageHeader from "../../../component/layout/PageHeader";


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
            <PageHeader>접수내역 조회</PageHeader>
            <MonitorOrderFormSection />
            <MonitorOrderTable data={orders} />
            <MonitorOrderBottom />
        </div>
    );
}