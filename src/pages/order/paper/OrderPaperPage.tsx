import { useEffect, useState } from "react";
import type { OrderPaper } from "../../../types/order/OrderPaper";
import OrderPaperFormSection from "./components/OrderPaperFormSection";
import OrderPaperTable from "./components/OrderPaperTable";

export default function OrderPaperPage() {
    const [orderPapers, setOrderPapers] = useState<OrderPaper[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("orderPapers");
        if (saved) setOrderPapers(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orderPapers", JSON.stringify(orderPapers));
    }, [orderPapers]);

    const addOrderPaper = (orderPaper: OrderPaper) => {
        setOrderPapers(prev => [...prev, orderPaper]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재발주 - 용지</h1>
            <OrderPaperFormSection onAdd={addOrderPaper} />
            <OrderPaperTable data={orderPapers} />
        </div>
    );
}