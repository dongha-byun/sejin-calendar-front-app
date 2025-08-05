import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import CommandCustomPrintFormSection from "./components/CommandCustomPrintFormSection";
import CommandCustomPrintTable from "./components/CommandCustomPrintTable";

export default function CommandCustomPrintPage() {
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
            <h1 className="text-base font-semibold pb-2">작업지시 - 상호쇄입지시</h1>
            <CommandCustomPrintFormSection />
            <CommandCustomPrintTable data={orders} />
        </div>
    );
}