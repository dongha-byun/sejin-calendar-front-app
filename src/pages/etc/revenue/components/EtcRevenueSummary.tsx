import type { EtcRevenueSummaryData } from "../../../../types/etc/EtcRevenue";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    summary: EtcRevenueSummaryData;
}

export default function EtcRevenueSummary({ summary }: Props) {
    const val = (n: number) => (
        <span className="font-semibold text-red-600">{formatNumber(n)}</span>
    );

    return (
        <div className="flex flex-wrap items-center gap-6 rounded bg-white px-4 py-2 shadow text-sm border-t">
            <span>접수: {val(summary.receiveAmount)}</span>
            <span>출고: {val(summary.releaseAmount)}</span>
            <span>미출고: {val(summary.unreleaseAmount)}</span>
            <span>매출액합계(접수): {val(summary.receivePrice)}</span>
            <span>매출액합계(출고): {val(summary.releasePrice)}</span>
        </div>
    );
}
