import type { PutinPaper } from "../../../../types/putin/PutinPaper";

interface Props {
    data: PutinPaper[];
}

export default function MonitorPrintFirstTable ({data}: Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">지업사</th>
                        <th className="border px-2 py-1">입고일</th>
                        <th className="border px-2 py-1">무게</th>
                        <th className="border px-2 py-1">지질</th>
                        <th className="border px-2 py-1">규격</th>
                        <th className="border px-2 py-1">입고량</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.companyName}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.weight}</td>
                        <td className="border px-2 py-1">{s.properties}</td>
                        <td className="border px-2 py-1">{s.standard}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}