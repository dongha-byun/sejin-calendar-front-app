import { useEffect, useState } from "react";
import type { OrderMaterial } from "../../../types/order/OrderMaterial";
import OrderMaterialFormSection from "./components/OrderMaterialFormSection";
import OrderMaterialTable from "./components/OrderMaterialTable";

export default function OrderMaterialPage() {
    const [models, setModels] = useState<OrderMaterial[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem("orderMaterials");
        if (saved) setModels(JSON.parse(saved));
    }, []);

    useEffect(() => {
        localStorage.setItem("orderMaterials", JSON.stringify(models));
    }, [models]);

    const addModel = (orderMaterial: OrderMaterial) => {
        setModels(prev => [...prev, orderMaterial]);
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재발주 - 원자재</h1>
            <OrderMaterialFormSection onAdd={addModel} />
            <OrderMaterialTable data={models} />
        </div>
    );
}