import type { CommandDeliveryDetailDto } from "../../../../types/monitor/MonitorPaperStockResponse";

interface Props {
    data: CommandDeliveryDetailDto[];
}

export default function MonitorPaperCompany({ data }: Props) {
    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200 sticky top-0">
                    <tr>
                        <th className="border px-2 py-1">지업사</th>
                        <th className="border px-2 py-1">배송일</th>
                        <th className="border px-2 py-1">배송량</th>
                        <th className="border px-2 py-1">인쇄소</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.commandPaperDeliveryId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.paperCompanyName}</td>
                        <td className="border px-2 py-1">{s.deliveryDate}</td>
                        <td className="border px-2 py-1 text-right">{s.amount.toLocaleString()}</td>
                        <td className="border px-2 py-1">{s.printCompanyName}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
