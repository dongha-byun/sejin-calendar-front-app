import { useEffect } from "react";
import ListCheckBox from "../../../../component/grid/ListCheckBox";
import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
    data: Order[];
    searchOrder?: Order;
    checkedIds: number[];
    checkOrder: (id: number, isChecked: boolean) => void;
}

export default function OrderManagerReturnsTable ({ data, searchOrder, checkedIds, checkOrder }: Props) {

    useEffect(() => {
        if (searchOrder) {
            const row = document.getElementById(`row-${searchOrder.orderNum}`);
            if (row) {
                row.scrollIntoView({ behavior: "smooth", block: "center" });
                (row as HTMLElement).focus();
            }
        }
    }, [searchOrder, data]);

    return (
        <div className="overflow-y-auto overflow-x-auto max-h-[400px]">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">check</th>
                        <th className="border px-2 py-1">접수번호</th>
                        <th className="border px-2 py-1">주문인</th>
                        <th className="border px-2 py-1">호수</th>
                        <th className="border px-2 py-1">주문량</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">state</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr 
                        key={s.id ?? idx} 
                        id={`row-${s.orderNum}`}
                        tabIndex={-1}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                        <td className="border px-2 py-1 text-center">
                            {s.id != null ? (
                                <ListCheckBox 
                                    checked={checkedIds.includes(s.id)} 
                                    onChange={(e) => checkOrder(s.id!, e.target.checked)} 
                                />
                            ) : (
                                <span>-</span>
                            )}
                        </td>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.state}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}