import { useEffect, useState } from "react";
import "./print.css";
import type { CommandPrintCnSearchDto } from "../../../../types/command/CommandPrintCn";

export default function CommandCustomPrintPrintTemplate() {
    const [orders, setOrders] = useState<CommandPrintCnSearchDto[]>([]);

    useEffect(() => {
        const selectedOrders = sessionStorage.getItem("selectedOrders");
        if(selectedOrders) {
            setOrders(JSON.parse(selectedOrders));
            sessionStorage.removeItem("selectedOrders");
        }
    }, []);

    useEffect(() => {
        // 데이터가 로드되고 렌더링이 완료된 후 인쇄 대화상자 열기
        if (orders.length > 0) {
            // DOM 렌더링을 위한 짧은 지연
            const timer = setTimeout(() => {
                window.print();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [orders]);

    return (
        <div className="print-container">
            <h1 className="print-title">상호쇄입지시서</h1>
            <table className="print-table">
                <thead>
                    <tr>
                    <th>No</th>
                    <th>주문번호</th>
                    <th>주문인</th>
                    <th>호수</th>
                    <th>부수</th>
                    <th>상호</th>
                    <th>도</th>
                    <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((item, idx) => (
                    <tr key={item.id}>
                        <td>{idx + 1}</td>
                        <td>{item.orderNum}</td>
                        <td>{item.customerName}</td>
                        <td>{item.modelNum}</td>
                        <td>{item.amount}</td>
                        <td>{item.printCn}</td>
                        <td>{item.dosu}</td>
                        <td>{item.etc1}</td>
                    </tr>
                    ))}
                </tbody>
            </table>

            <footer className="print-footer">
                인쇄일자: {new Date().toLocaleDateString()}
            </footer>
        </div>
    );
};
