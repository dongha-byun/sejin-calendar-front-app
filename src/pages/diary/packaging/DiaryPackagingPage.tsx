import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import DiaryPackagingFormSection from "./components/DiaryPackagingFormSection";
import DiaryPackagingTable from "./components/DiaryPackagingTable";


export default function DiaryPackagingPage() {
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
            <h1 className="text-base font-semibold pb-2">작업일지 - 포장</h1>
            <DiaryPackagingFormSection />
            <DiaryPackagingTable data={orders} />
        </div>
    );
}