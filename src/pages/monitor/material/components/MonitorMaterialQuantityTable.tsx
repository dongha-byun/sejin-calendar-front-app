import type { PutinMaterial } from "../../../../types/putin/PutinMaterial";

interface Props {
    data: PutinMaterial[];
}

export default function MonitorMaterialQuantityTable({ data }: Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">거래처</th>
                        <th className="border px-2 py-1">규격1</th>
                        <th className="border px-2 py-1">규격2</th>
                        <th className="border px-2 py-1">내역</th>
                        <th className="border px-2 py-1">색상</th>
                        <th className="border px-2 py-1">입고일</th>
                        <th className="border px-2 py-1">입고량</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.companyName}</td>
                        <td className="border px-2 py-1">{s.standard1}</td>
                        <td className="border px-2 py-1">{s.standard2}</td>
                        <td className="border px-2 py-1">{s.contents}</td>
                        <td className="border px-2 py-1">{s.color}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}