import type { CommandDeliveryDetailDto, DeliverySummaryDto } from "../../../../types/monitor/MonitorPaperStockResponse";

interface Props {
    isDetail: boolean;
    detail: CommandDeliveryDetailDto[];
    summary: DeliverySummaryDto[];
}

export default function MonitorPaperCompany({ isDetail, detail, summary }: Props) {
    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {isDetail ? (
                <table className="table-auto border text-sm whitespace-nowrap">
                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            <th className="border px-2 py-1">지업사</th>
                            <th className="border px-2 py-1">배송일</th>
                            <th className="border px-2 py-1">배송량</th>
                            <th className="border px-2 py-1">인쇄소</th>
                        </tr>
                    </thead>
                    <tbody>
                    {detail.map((s, idx) => (
                        <tr key={s.commandPaperDeliveryId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.paperCompanyName}</td>
                            <td className="border px-2 py-1">{s.deliveryDate}</td>
                            <td className="border px-2 py-1 text-right">{s.amount.toLocaleString()}</td>
                            <td className="border px-2 py-1">{s.printCompanyName}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <table className="table-auto border text-sm whitespace-nowrap">
                    <thead className="bg-gray-200 sticky top-0">
                        <tr>
                            <th className="border px-2 py-1">지업사</th>
                            <th className="border px-2 py-1">인쇄소</th>
                            <th className="border px-2 py-1">배송량 합계</th>
                        </tr>
                    </thead>
                    <tbody>
                    {summary.map((s, idx) => (
                        <tr key={`${s.paperCompanyName}-${s.printCompanyName}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.paperCompanyName}</td>
                            <td className="border px-2 py-1">{s.printCompanyName}</td>
                            <td className="border px-2 py-1 text-right">{s.totalAmount.toLocaleString()}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
