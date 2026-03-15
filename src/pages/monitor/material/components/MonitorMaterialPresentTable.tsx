import type { MonitorMaterialUsageDetailResponse, MonitorMaterialUsageSummaryResponse } from "../../../../types/monitor/MonitorMaterialSearchResponse";

interface Props {
    detailList: MonitorMaterialUsageDetailResponse[];
    summaryList: MonitorMaterialUsageSummaryResponse[];
    isDetailView: boolean;
}

export default function MonitorMaterialPresentTable({ detailList, summaryList, isDetailView }: Props) {

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
                    {isDetailView ? (
                        detailList.map((d, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border px-2 py-1">{d.iDate}</td>
                                <td className="border px-2 py-1">{d.amount}</td>
                                <td className="border px-2 py-1">{d.modelNum}</td>
                                <td className="border px-2 py-1">{d.modelName}</td>
                                <td className="border px-2 py-1">{d.width}</td>
                                <td className="border px-2 py-1">{d.companyName}</td>
                            </tr>
                        ))
                    ) : (
                        summaryList.map((s, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1">{s.amount}</td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1">{s.width}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div> 
    );
}