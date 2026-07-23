import type { CommandPrintDetailDto, PrintSummaryDto } from "../../../../types/monitor/MonitorPaperStockResponse";

interface Props {
    isDetail: boolean;
    detail: CommandPrintDetailDto[];
    summary: PrintSummaryDto[];
}

function DetailTable({ data }: { data: CommandPrintDetailDto[] }) {
    return (
        <table className="table-auto border text-sm whitespace-nowrap">
            <thead>
                <tr>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">인쇄전표번호</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">인쇄소</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">인쇄일</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">사용량</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">모델#</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">모델명</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">부수</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200">S</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.commandPrintId} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{s.statementNum}</td>
                    <td className="border px-2 py-1">{s.printCompanyName}</td>
                    <td className="border px-2 py-1">{s.printDate}</td>
                    <td className="border px-2 py-1 text-right">{s.amount?.toLocaleString() ?? '-'}</td>
                    <td className="border px-2 py-1">{s.modelNum}</td>
                    <td className="border px-2 py-1">{s.modelName}</td>
                    <td className="border px-2 py-1 text-right">{s.totalCount.toLocaleString()}</td>
                    <td className="border px-2 py-1">{s.state}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

function SummaryTable({ data }: { data: PrintSummaryDto[] }) {
    return (
        <table className="w-full table-auto border text-sm">
            <thead>
                <tr>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">인쇄소</th>
                    <th className="border px-2 py-1 sticky top-0 bg-gray-200 text-left">사용량 합계</th>
                </tr>
            </thead>
            <tbody>
            {data.map((s, idx) => (
                <tr key={s.printCompanyName} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border px-2 py-1">{s.printCompanyName}</td>
                    <td className="border px-2 py-1 text-right">{s.totalAmount.toLocaleString()}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default function MonitorPaperCommandPrintList({ isDetail, detail, summary }: Props) {
    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            {isDetail
                ? <DetailTable data={detail} />
                : <SummaryTable data={summary} />
            }
        </div>
    );
}
