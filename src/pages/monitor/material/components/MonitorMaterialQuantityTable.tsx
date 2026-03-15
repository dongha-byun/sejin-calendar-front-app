import type { MonitorMaterialPutinDetailResponse, MonitorMaterialPutinSummaryResponse } from "../../../../types/monitor/MonitorMaterialSearchResponse";

interface Props {
    detailList: MonitorMaterialPutinDetailResponse[];
    summaryList: MonitorMaterialPutinSummaryResponse[];
    isDetailView: boolean;
}

export default function MonitorMaterialQuantityTable({ detailList, summaryList, isDetailView }: Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">거래처</th>
                        <th className="border px-2 py-1">규격1</th>
                        <th className="border px-2 py-1">규격2</th>
                        <th className="border px-2 py-1">내역</th>
                        <th className="border px-2 py-1">색상</th>
                        <th className="border px-2 py-1">입고일</th>
                        <th className="border px-2 py-1">입고량</th>
                    </tr>
                </thead>
                <tbody>
                    {isDetailView ? (   
                        detailList.map((d, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border px-2 py-1">{d.companyName}</td>
                                <td className="border px-2 py-1">{d.standard1}</td>
                                <td className="border px-2 py-1">{d.standard2}</td>
                                <td className="border px-2 py-1">{d.contents}</td>
                                <td className="border px-2 py-1">{d.color}</td>
                                <td className="border px-2 py-1">{d.iDate}</td>
                                <td className="border px-2 py-1">{d.amount}</td>
                            </tr>
                        ))
                    ) : (
                        summaryList.map((s, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1">{s.standard1}</td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1"></td>
                                <td className="border px-2 py-1">{s.amount}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div> 
    );
}