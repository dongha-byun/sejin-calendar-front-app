import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import DiaryOrderOutFormSection from "./components/DiaryOrderOutFormSection";
import DiaryOrderOutTable from "./components/DiaryOrderOutTable";

export default function DiaryOrderOutPage() {
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
            <h1 className="text-base font-semibold pb-2">작업일지 - 제품출고</h1>
            <DiaryOrderOutFormSection />
            <DiaryOrderOutTable data={orders} />
        </div>
    );
}