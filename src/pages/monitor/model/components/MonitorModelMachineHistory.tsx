import type { DiaryMachine } from "../../../../types/diary/DiaryMachine";

interface Props {
    data : DiaryMachine[];
}

export default function MonitorModelMachineHistory({data}: Props) {

    return (
        <div>
            <div className="text-center">
                정합내역
            </div>
            <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
                <table className="table-auto border text-sm w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">작업일</th>
                            <th className="border px-2 py-1">수량</th>
                            <th className="border px-2 py-1">상호</th>
                            <th className="border px-2 py-1">기계</th>
                            <th className="border px-2 py-1">비고</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.iDate}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.printCn}</td>
                            <td className="border px-2 py-1">{s.machineNum}</td>
                            <td className="border px-2 py-1">{s.etc}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> 
            <div className="text-center">
                합계 : <span className="text-blue-700">934000</span>
            </div>
        </div>
    );
}