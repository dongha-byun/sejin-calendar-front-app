import { useEffect, useState } from "react";
import type { OrderMaterial } from "../../../types/order/OrderMaterial";
import OrderMaterialFormSection from "./components/OrderMaterialFormSection";
import OrderMaterialTable from "./components/OrderMaterialTable";
import { orderMaterialApi } from "../../../api/order/orderMaterialApi";
import { BindMethod, type Material } from "../../../types/baseinfo/Material";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import { materialApi } from "../../../api/baseinfo/materialApi";

export default function OrderMaterialPage() {
    const [orderMaterials, setOrderMaterials] = useState<OrderMaterial[]>([]);
    const [customCompanies, setCustomCompanies] = useState<CustomCompany[]>([]);
    const [selectedBindMethod, setSelectedBindMethod] = useState<BindMethod>(BindMethod.IRON);
    const [materials, setMaterials] = useState<Material[]>([]);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Material).then(setCustomCompanies);
    }, []);

    useEffect(() => {
        orderMaterialApi.list(selectedBindMethod).then(setOrderMaterials);
        materialApi.list(selectedBindMethod).then(setMaterials);
    }, [selectedBindMethod]);

    const addOrderMaterial = (orderMaterial: OrderMaterial) => {
        orderMaterialApi.save(orderMaterial).then(() => {
            orderMaterialApi.list(selectedBindMethod).then(setOrderMaterials);
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재발주 - 원자재</h1>
            <OrderMaterialFormSection 
                onAdd={addOrderMaterial} 
                selectedBindMethod={selectedBindMethod}
                onChangeBindMethod={setSelectedBindMethod} 
                companies={customCompanies} materials={materials}
            />
            <OrderMaterialTable data={orderMaterials} />
        </div>
    );
}