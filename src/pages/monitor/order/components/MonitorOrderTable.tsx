import type { Order } from "../../../../types/ordermanager/Order";

interface Props {
    data: Order[];
}

export default function MonitorOrderTable({data} : Props) {
    return (
        <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">주문번호</th>
                        <th className="border px-2 py-1">거래처명</th>
                        <th className="border px-2 py-1">상호</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.orderNum}</td>
                        <td className="border px-2 py-1">{s.customerName}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}