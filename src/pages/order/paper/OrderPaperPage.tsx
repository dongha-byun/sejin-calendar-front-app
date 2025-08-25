import { useEffect, useState } from "react";
import type { OrderPaper } from "../../../types/order/OrderPaper";
import OrderPaperFormSection from "./components/OrderPaperFormSection";
import OrderPaperTable from "./components/OrderPaperTable";
import { orderPaperApi } from "../../../api/order/orderPaperApi";
import { CompanyType, type CustomCompany } from "../../../types/baseinfo/CustomCompany";
import { customCompanyApi } from "../../../api/baseinfo/customCompanyApi";
import type { Paper } from "../../../types/baseinfo/Paper";
import { paperApi } from "../../../api/baseinfo/paperApi";

export default function OrderPaperPage() {
    const [orderPapers, setOrderPapers] = useState<OrderPaper[]>([]);
    const [companies, setCompanies] = useState<CustomCompany[]>([]);
    const [papers, setPapers] = useState<Paper[]>([]);

    useEffect(() => {
        customCompanyApi.list(CompanyType.Paper).then(setCompanies);
        paperApi.list().then(setPapers);
    }, []);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = () => {
        orderPaperApi.list().then(setOrderPapers);
    }

    const addOrderPaper = (orderPaper: OrderPaper) => {
        orderPaperApi.save(orderPaper).then(() => {
            fetch();
        });
    };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">자재발주 - 용지</h1>
            <OrderPaperFormSection onAdd={addOrderPaper} companies={companies} papers={papers} />
            <OrderPaperTable data={orderPapers} />
        </div>
    );
}