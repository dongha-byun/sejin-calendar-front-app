import { useEffect, useRef, useState } from "react";
import DiaryPackagingFormSection from "./components/DiaryPackagingFormSection";
import DiaryPackagingTable from "./components/DiaryPackagingTable";
import { BindMethod, type Material } from "../../../types/baseinfo/Material";
import { materialApi } from "../../../api/baseinfo/materialApi";
import { diaryBoxingApi } from "../../../api/diary/diaryBoxingApi";
import type { SomsResponse } from "../../../api/somsResponse";
import type { DiaryBoxingOrder } from "../../../types/diary/DiaryBoxing";
import type { FormSectionRef } from "./components/DiaryPackagingFormSection";
import { nowDate } from "../../../utils/dateUtils";

export interface RealBoxInfo {
    box: string;
    boxCount: number;
}

export default function DiaryPackagingPage() {
    const [boxingOrders, setBoxingOrders] = useState<DiaryBoxingOrder[]>([]);
    const [currentOrder, setCurrentOrder] = useState<DiaryBoxingOrder>();
    const [checkedIds, setCheckedIds] = useState<number[]>([]);
    const [boxes, setBoxes] = useState<Material[]>([]);
    const formSectionRef = useRef<FormSectionRef>(null);

    useEffect(() => {
        materialApi.list(BindMethod.BOX).then(setBoxes);
    }, []);

    const onCheckId = (isChecked: boolean, id?: number) => {
        console.log('onCheckId', isChecked, id);
        if(id) {
            if(isChecked) {
                setCheckedIds(prev => [...prev, id]);
            } else {
                setCheckedIds(prev => prev.filter(n => n !== id));
            }
        }
    }

    const searchOrder = (orderNum: number) => {
        diaryBoxingApi.searchOrder(orderNum).then(res => {
            const boxingOrder = res.data;
            if(boxingOrder.boxDate && !confirm("이미 포장 정보가 입력되어 있는 주문번호입니다. \n다시 입력하시겠습니까?")) {
                return;
            }
            setBoxingOrders([...boxingOrders, boxingOrder]);
            setCurrentOrder(boxingOrder);
        }).catch((error: SomsResponse<any>) => {
            console.error(error);
            alert(error.result.message);
        });
    }

    const applyBoxInfo = (orderId: number, realBox: string, realBoxCount: number) => {
        // boxingOrders에서 orderId가 같은 항목을 찾아 realBox, realBoxCount를 변경합니다.
        const updatedOrders = boxingOrders.map(order => {
            if (order.orderId === orderId) {
                return { ...order, realBox, realBoxCount };
            }
            return order;
        });
        setBoxingOrders(updatedOrders);
    }

    const saveBoxing = () => {
        const boxingOrderRequests = boxingOrders.map(order => ({
            orderId: order.orderId,
            boxNum: order.realBox,
            boxAmount: order.realBoxCount,
            boxDate: formSectionRef.current?.boxDate ?? nowDate
        }));

        diaryBoxingApi.saveBoxing(boxingOrderRequests).then(() => {
            onInit();
        }).catch((error: SomsResponse<any>) => {
            console.error(error);
            alert(error.result.message);
        });
    }

    const deleteRows = (ids: number[]) => {
        setBoxingOrders(boxingOrders.filter(s => !ids.includes(s.orderId ?? 0)));
        setCheckedIds([]);
    }

    const onInit = () => {
        formSectionRef.current?.handleInit();
        setBoxingOrders([]);
        setCheckedIds([]);
        setCurrentOrder(undefined);
    }

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">작업일지 - 포장</h1>
            <DiaryPackagingFormSection boxes={boxes} 
                searchOrder={searchOrder} currentOrder={currentOrder} 
                applyBoxInfo={applyBoxInfo} ref={formSectionRef} />
            <DiaryPackagingTable data={boxingOrders} 
                checkedIds={checkedIds}
                onCheckId={onCheckId}
                deleteRows={deleteRows}
                onInit={onInit}
                saveBoxing={saveBoxing}
            />
        </div>
    );
}