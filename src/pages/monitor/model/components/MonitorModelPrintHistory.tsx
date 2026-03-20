import type { History, MonitorModelPrintHistoryResponse } from "../../../../types/monitor/MonitorModelSearchResponse";
import { formatNumber } from "../../../../utils/numberUtils";

interface Props {
    data : History<MonitorModelPrintHistoryResponse>;
}

export default function MonitorModelPrintHistory({data}: Props) {

    return (
        <div>
            <div className="text-center">
                인쇄내역
            </div>
            <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
                <table className="table-auto border text-sm w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">인쇄일자</th>
                            <th className="border px-2 py-1">인쇄소명</th>
                            <th className="border px-2 py-1">수량</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.list.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.printDate}</td>
                            <td className="border px-2 py-1">{s.printCompanyName}</td>
                            <td className="border px-2 py-1 text-right">{formatNumber(s.totalCount)}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div> 
            <div className="text-center">
                합계 : <span className="text-blue-700">{formatNumber(data.totalAmount)}</span>
            </div>
        </div>
    );
}