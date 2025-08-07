import type { MonitorMaterialPresentDto } from "../../../../types/monitor/MonitorMaterialPresentDto";

interface Props {
    data: MonitorMaterialPresentDto[];
}

export default function MonitorMaterialPresentTable({ data }: Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">사용일</th>
                        <th className="border px-2 py-1">사용량</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">규격</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.standard}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}