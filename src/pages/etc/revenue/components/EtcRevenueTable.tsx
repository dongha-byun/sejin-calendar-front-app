import type { EtcRevenueRow } from "../../../../types/etc/EtcRevenue";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    data: EtcRevenueRow[];
}

const cell = (v: string | number | null | undefined) =>
    v === null || v === undefined ? '' : String(v);

export default function EtcRevenueTable({ data }: Props) {
    return (
        <div className="h-[500px] overflow-x-auto overflow-y-auto bg-white">
            <table className="table-auto min-w-max border text-sm w-full border-spacing-0">
                <thead className="bg-gray-200 sticky top-0">
                    <tr>
                        <th className="border px-2 py-1 whitespace-nowrap">접수번호</th>
                        <th className="border px-2 py-1 whitespace-nowrap">모델#</th>
                        <th className="border px-2 py-1 whitespace-nowrap">거래처명</th>
                        <th className="border px-2 py-1 whitespace-nowrap">인쇄처</th>
                        <th className="border px-2 py-1 whitespace-nowrap">접수일</th>
                        <th className="border px-2 py-1 whitespace-nowrap">수량</th>
                        <th className="border px-2 py-1 whitespace-nowrap">금액</th>
                        <th className="border px-2 py-1 whitespace-nowrap">상태</th>
                        <th className="border px-2 py-1 whitespace-nowrap">납품완료일(상호)</th>
                        <th className="border px-2 py-1 whitespace-nowrap">박싱완료일</th>
                        <th className="border px-2 py-1 whitespace-nowrap">납품완료일(백제본)</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length === 0 ? (
                        <tr>
                            <td colSpan={11} className="border px-2 py-4 text-center text-gray-400">
                                데이터가 없습니다.
                            </td>
                        </tr>
                    ) : (
                        data.map((row, idx) => (
                            <tr
                                key={row.seqNum ?? idx}
                                className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                            >
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{row.seqNum}</td>
                                <td className="border px-2 py-1 whitespace-nowrap">{row.modelNum}</td>
                                <td className="border px-2 py-1 whitespace-nowrap">{row.customerName}</td>
                                <td className="border px-2 py-1 whitespace-nowrap">{row.printCn}</td>
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{cell(row.iDate)}</td>
                                <td className="border px-2 py-1 text-right whitespace-nowrap">{formatNumber(row.amount)}</td>
                                <td className="border px-2 py-1 text-right whitespace-nowrap">{formatNumber(row.price)}</td>
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{cell(row.state)}</td>
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{cell(row.pCompleteDate)}</td>
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{cell(row.boxDate)}</td>
                                <td className="border px-2 py-1 text-center whitespace-nowrap">{cell(row.rCompleteDate)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
