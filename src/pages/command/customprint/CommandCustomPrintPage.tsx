import { useEffect, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import CommandCustomPrintFormSection from "./components/CommandCustomPrintFormSection";
import CommandCustomPrintTable from "./components/CommandCustomPrintTable";
import { orderApi } from "../../../api/ordermanager/orderApi";

export default function CommandCustomPrintPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [checkIds, setCheckIds] = useState<number[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem("orders");
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderNum: string) => {
        orderApi.findOne(orderNum).then((order) => {
            setOrders([...orders, order]);
        });
    };

    // 모두선택: 리스트에 노출된 모든 체크박스를 체크
    const handleSelectAll = () => {
        const allIds = orders.filter(order => order.id).map(order => order.id!);
        setCheckIds(allIds);
    };

    // 선택삭제: 체크된 항목들을 리스트에서 제거
    const handleDeleteSelected = () => {
        setOrders(orders.filter(order => !checkIds.includes(order.id ?? 0)));
        setCheckIds([]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업지시 - 상호쇄입지시</h1>
            <CommandCustomPrintFormSection 
                addOrder={addOrder}
                onSelectAll={handleSelectAll}
                onDeleteSelected={handleDeleteSelected}
            />
            <CommandCustomPrintTable 
                data={orders}
                checkIds={checkIds}
                setCheckIds={setCheckIds}
            />
        </div>
    );
}