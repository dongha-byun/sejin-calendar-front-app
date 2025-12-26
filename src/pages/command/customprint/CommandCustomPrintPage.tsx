import { useEffect, useState } from "react";
import CommandCustomPrintFormSection from "./components/CommandCustomPrintFormSection";
import CommandCustomPrintTable from "./components/CommandCustomPrintTable";
import { commandPrintCnApi } from "../../../api/command/commandPrintCnApi";
import type { CommandPrintCnSearchDto } from "../../../types/command/CommandPrintCn";
import { orderApi } from "../../../api/ordermanager/orderApi";

export default function CommandCustomPrintPage() {
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [orders, setOrders] = useState<CommandPrintCnSearchDto[]>([]);
    const [checkIds, setCheckIds] = useState<number[]>([]);
    
    useEffect(() => {
        init();
    }, []);

    const init = () => {
        setOrders([]);
        setCheckIds([]);
    }

    const addOrder = (orderNum: number, printMethod: string) => {
        const existingOrder = orders.find(order => order.orderNum === orderNum);
        if(!existingOrder) {
            commandPrintCnApi.searchOrder(orderNum).then((res) => {
                if(res.result.success && res.data) {
                    // TODO : 쇄입방법이 다릅니다. 정말 추가하시겠습니까? alert 처리
                    if(printMethod && printMethod !== res.data.modelPrintMethod) {
                        if(!confirm("쇄입방법이 다릅니다. 정말 추가하시겠습니까?")) {
                            return;
                        }
                    }
                    setOrders([...orders, res.data]);
                    setErrorMessage('');
                } else {
                    setErrorMessage(res.result.message || "주문번호 [" + orderNum + "] 을 찾을 수 없습니다.");
                }
            }).catch((error) => {
                console.error(error);
                setErrorMessage("주문번호 [" + orderNum + "] " + error.result.message);
            });    
        }
    };

    const openPrintPop = (printMethod: string) => {
        if(checkIds.length < 1) {
            alert("체크된 값이 없습니다.");
            return;
        }
        if(!printMethod) {
            alert("쇄입방법을 선택해주세요.");
            return;
        }

        const selectedOrders = orders.filter(order => checkIds.includes(order.id ?? 0));
        sessionStorage.setItem("selectedOrders", JSON.stringify(selectedOrders));

        const popup = window.open(
            "/command/custom-print/print",
            "print",
            "width=900,height=1000"
        );

        // 팝업이 닫혔는지 감지
        if (popup) {
            const checkClosed = setInterval(() => {
                if (popup.closed) {
                    clearInterval(checkClosed);
                    if(confirm("정상적으로 출력되었으면, 내용을 기록하시겠습니까?")) {
                        updatePrintInfo(printMethod, checkIds);
                        init();
                    }
                }
            }, 100);
        }
    }

    const updatePrintInfo = (printMethod: string, orderIds: number[]) => {
        orderApi.commandPrintCn(printMethod, orderIds);
    }

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
                openPrintPop={openPrintPop}
                errorMessage={errorMessage}
            />
            <CommandCustomPrintTable 
                data={orders}
                checkIds={checkIds}
                setCheckIds={setCheckIds}
            />
        </div>
    );
}