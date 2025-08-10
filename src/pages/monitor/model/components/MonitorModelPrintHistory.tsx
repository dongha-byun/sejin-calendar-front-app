import type { CommandPrint } from "../../../../types/command/CommandPrint";

interface Props {
    data : CommandPrint[];
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
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.iDate}</td>
                            <td className="border px-2 py-1">{s.printCompanyName}</td>
                            <td className="border px-2 py-1">{s.orderCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                
            </div> 
            <div className="text-center">
                합계 : <span className="text-blue-700">2000</span>
            </div>
        </div>
    );
}