import type { OrderMaterial } from "../../../../types/order/OrderMaterial";

interface Props {
  data: OrderMaterial[];
}

export default function OrderMaterialTable({ data }: Props) {
    return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-2 py-1">전표번호</th>
                    <th className="border px-2 py-1">분류</th>
                    <th className="border px-2 py-1">거래처</th>
                    <th className="border px-2 py-1">규격1</th>
                    <th className="border px-2 py-1">규격2</th>
                    <th className="border px-2 py-1">내역</th>
                    <th className="border px-2 py-1">색상</th>
                    <th className="border px-2 py-1">수량</th>
                    <th className="border px-2 py-1">발주일자</th>
                    <th className="border px-2 py-1">납품요구일</th>
                    <th className="border px-2 py-1">비고</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-center">{s.statementNum}</td>
                    <td className="border px-2 py-1">{s.bindMethod}</td>
                    <td className="border px-2 py-1">{s.companyName}</td>
                    <td className="border px-2 py-1">{s.standard1}</td>
                    <td className="border px-2 py-1">{s.standard2}</td>
                    <td className="border px-2 py-1">{s.contents}</td>
                    <td className="border px-2 py-1">{s.color}</td>
                    <td className="border px-2 py-1 text-right">{s.amount}</td>
                    <td className="border px-2 py-1">{s.iDate}</td>
                    <td className="border px-2 py-1">{s.demandDate}</td>
                    <td className="border px-2 py-1">{s.etc}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div> 
    );
}