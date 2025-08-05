import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import CommandOrderOutFormSection from "./components/CommandOrderOutFormSection";
import CommandOrderOutTable from "./components/CommandOrderOutTable";


export default function CommandOrderOutPage () {
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
            <h1 className="text-base font-semibold pb-2">작업지시 - 출고증발행</h1>
            <CommandOrderOutFormSection />
            <CommandOrderOutTable data={orders} />
        </div>
    );
}