import { useEffect, useRef, useState } from "react";
import type { Order } from "../../../types/ordermanager/Order";
import DiaryPrintCnFormSection, { type FormSectionRef } from "./components/DiaryPrintCnFormSection";
import DiaryPrintCnTable from "./components/DiaryPrintCnTable";
import { diaryPrintCnApi } from "../../../api/diary/diaryPrintCnApi";
import type { SomsResponse } from "../../../api/somsResponse";

export default function DiaryPrintCnPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const formSectionRef = useRef<FormSectionRef>(null);
    
    const onCheckId = (isChecked: boolean, id?: number) => {
        if(id) {
            if(isChecked) {
                setCheckedIds([...checkedIds, id]);
            } else {
                setCheckedIds(checkedIds.filter(n => n !== id));
            }
        }
    }

    useEffect(() => {
        const saved = localStorage.getItem("orders");
        if (saved) setOrders(JSON.parse(saved));
    }, []);

    const searchOrder = (printMethod: string, orderNum: number) => {
        diaryPrintCnApi.searchOrder(printMethod, orderNum)
            .then(res => {
                setOrders([...orders, res.data]);
            })
            .catch((error: SomsResponse<any>) => {
                console.error(error);
                alert(error.result.message);
        });
    }

    const completePrint = () => {
        diaryPrintCnApi.completePrint(formSectionRef.current?.issueDate ?? '', checkedIds).then(() => {
            onInit();
        }).catch((error: SomsResponse<any>) => {
            console.error(error);
            alert(error.result.message);
        });
    }

    const deleteRows = (ids: number[]) => {
        setOrders(orders.filter(s => !ids.includes(s.id ?? 0)));
        setCheckedIds([]);
    }

    const onInit = () => {
        formSectionRef.current?.handleInit();
        setOrders([]);
        setCheckedIds([]);
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 상호인쇄</h1>
            <DiaryPrintCnFormSection ref={formSectionRef} searchOrder={searchOrder} />
            <DiaryPrintCnTable data={orders} checkedIds={checkedIds} onCheckId={onCheckId} deleteRows={deleteRows} onInit={onInit} completePrint={completePrint}/>
        </div>
    );
}