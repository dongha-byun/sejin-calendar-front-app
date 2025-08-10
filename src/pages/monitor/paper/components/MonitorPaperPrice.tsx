import type { PutinPaper } from "../../../../types/putin/PutinPaper";

interface Props {
    data: PutinPaper[];
}

export default function MonitorPaperPrice({ data }: Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">지업사</th>
                        <th className="border px-2 py-1">입고일</th>
                        <th className="border px-2 py-1">입고량</th>
                        <th className="border px-2 py-1">단가</th>
                        <th className="border px-2 py-1">금액</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.companyName}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.pricePer}</td>
                        <td className="border px-2 py-1">{s.price}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}