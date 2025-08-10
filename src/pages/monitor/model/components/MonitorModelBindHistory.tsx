import type { DiaryBind } from "../../../../types/diary/DiaryBind";

interface Props {
    data : DiaryBind[];
}

export default function MonitorModelBindHistory({data}: Props) {

    return (
        <div>
            <div className="text-center">
                제본내역
            </div>
            <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
                <table className="table-auto border text-sm w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">작업일</th>
                            <th className="border px-2 py-1">수량</th>
                            <th className="border px-2 py-1">상호</th>
                            <th className="border px-2 py-1">제본</th>
                            <th className="border px-2 py-1">비고</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white h-12" : "bg-gray-50 h-12"}>
                            <td className="border px-2 py-1">{s.iDate}</td>
                            <td className="border px-2 py-1">{s.amount}</td>
                            <td className="border px-2 py-1">{s.printCn}</td>
                            <td className="border px-2 py-1">{s.bindMethod}</td>
                            <td className="border px-2 py-1">{s.etc}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div> 
            <div className="text-center">
                합계 : <span className="text-blue-700">929000</span>
            </div>
        </div>
    );
}