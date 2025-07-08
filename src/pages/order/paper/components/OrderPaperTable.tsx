import type { OrderPaper } from "../../../../types/order/OrderPaper";

interface Props {
  data: OrderPaper[];
}

export default function OrderPaperTable({ data }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">전표번호</th>
                        <th className="border px-2 py-1">지업사명</th>
                        <th className="border px-2 py-1">무게</th>
                        <th className="border px-2 py-1">지질</th>
                        <th className="border px-2 py-1">규격</th>
                        <th className="border px-2 py-1">수량</th>
                        <th className="border px-2 py-1">주문일</th>
                        <th className="border px-2 py-1">비고</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1 text-center">{s.statementNum}</td>
                        <td className="border px-2 py-1">{s.companyName}</td>
                        <td className="border px-2 py-1">{s.weight}</td>
                        <td className="border px-2 py-1">{s.properties}</td>
                        <td className="border px-2 py-1">{s.standard}</td>
                        <td className="border px-2 py-1 text-right">{s.amount}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.etc}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}