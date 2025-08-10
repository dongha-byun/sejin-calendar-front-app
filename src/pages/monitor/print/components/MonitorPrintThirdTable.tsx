import type { MonitorPrintThirdDto } from "../../../../types/monitor/MonitorPrintThirdDto";

interface Props {
    data: MonitorPrintThirdDto[];
}

export default function MonitorPrintThirdTable({data} : Props) {
     
    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">무게</th>
                        <th className="border px-2 py-1">지질</th>
                        <th className="border px-2 py-1">규격</th>
                        <th className="border px-2 py-1">사용량</th>
                        <th className="border px-2 py-1">인쇄소</th>
                        <th className="border px-2 py-1">인쇄전표번호</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.weight}</td>
                        <td className="border px-2 py-1">{s.properties}</td>
                        <td className="border px-2 py-1">{s.standard}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.statementNum}</td>
                        <td className="border px-2 py-1">{s.printCompanyName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}