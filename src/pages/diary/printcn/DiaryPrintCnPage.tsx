import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import DiaryPrintCnFormSection from "./components/DiaryPrintCnFormSection";
import DiaryPrintCnTable from "./components/DiaryPrintCnTable";

export default function DiaryPrintCnPage() {
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
            <h1 className="text-base font-semibold pb-2">작업일지 - 상호인쇄</h1>
            <DiaryPrintCnFormSection />
            <DiaryPrintCnTable data={orders} />
        </div>
    );
}