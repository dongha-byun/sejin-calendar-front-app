import type { PutinMaterial } from "../../../../types/putin/PutinMaterial";

interface Props {
  data: PutinMaterial[];
}

export default function PutinMaterialTable({ data }: Props) {
    return (
    <div className="overflow-x-auto">
        <table className="table-auto w-full border text-sm">
            <thead className="bg-gray-200">
                <tr>
                    <th className="border px-2 py-1">분류</th>
                    <th className="border px-2 py-1">거래처명</th>
                    <th className="border px-2 py-1">규격1</th>
                    <th className="border px-2 py-1">규격2</th>
                    <th className="border px-2 py-1">내역</th>
                    <th className="border px-2 py-1">색상</th>
                    <th className="border px-2 py-1">수량</th>
                    <th className="border px-2 py-1">단가</th>
                    <th className="border px-2 py-1">금액</th>
                    <th className="border px-2 py-1">주문일</th>
                    <th className="border px-2 py-1">결제</th>
                    <th className="border px-2 py-1">비고</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{s.bindMethod}</td>
                    <td className="border px-2 py-1">{s.companyName}</td>
                    <td className="border px-2 py-1">{s.standard1}</td>
                    <td className="border px-2 py-1">{s.standard2}</td>
                    <td className="border px-2 py-1">{s.contents}</td>
                    <td className="border px-2 py-1">{s.color}</td>
                    <td className="border px-2 py-1 text-right">{s.amount}</td>
                    <td className="border px-2 py-1 text-right">{s.pricePer}</td>
                    <td className="border px-2 py-1 text-right">{s.price}</td>
                    <td className="border px-2 py-1">{s.iDate}</td>
                    <td className="border px-2 py-1">{s.approval}</td>
                    <td className="border px-2 py-1">{s.etc}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </div> 
    );
}