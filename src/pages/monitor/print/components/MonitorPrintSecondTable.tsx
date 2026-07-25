import type { PrintDeliveryDetailDto, PrintDeliverySummaryDto } from "../../../../types/monitor/MonitorPrintStockResponse";

interface Props {
    isDetail: boolean;
    detail: PrintDeliveryDetailDto[];
    summary: PrintDeliverySummaryDto[];
}

function DetailTable({ data }: { data: PrintDeliveryDetailDto[] }) {
    return (
        <table className="table-auto border text-sm whitespace-nowrap">
            <thead>
                <tr>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">지업사</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">입고일</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">무게</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">지질</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">규격</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">입고량</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">인쇄소</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.commandPaperDeliveryId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{s.paperCompanyName}</td>
                    <td className="border px-2 py-1">{s.issueDate}</td>
                    <td className="border px-2 py-1 text-right">{s.weight}</td>
                    <td className="border px-2 py-1">{s.properties}</td>
                    <td className="border px-2 py-1">{s.standard}</td>
                    <td className="border px-2 py-1 text-right">{s.amount.toLocaleString()}</td>
                    <td className="border px-2 py-1">{s.printCompanyName}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function SummaryTable({ data }: { data: PrintDeliverySummaryDto[] }) {
    return (
        <table className="table-auto border text-sm whitespace-nowrap">
            <thead>
                <tr>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">무게</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">지질</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">규격</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">인쇄소</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">입고량 합계</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={`${s.weight}-${s.properties}-${s.standard}-${s.printCompanyName}`} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1 text-right">{s.weight}</td>
                    <td className="border px-2 py-1">{s.properties}</td>
                    <td className="border px-2 py-1">{s.standard}</td>
                    <td className="border px-2 py-1">{s.printCompanyName}</td>
                    <td className="border px-2 py-1 text-right">{s.totalAmount.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default function MonitorPrintSecondTable({ isDetail, detail, summary }: Props) {
    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {isDetail
                ? <DetailTable data={detail} />
                : <SummaryTable data={summary} />
            }
        </div>
    );
}
