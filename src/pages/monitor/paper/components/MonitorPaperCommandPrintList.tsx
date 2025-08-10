import type { CommandPrint } from "../../../../types/command/CommandPrint";

interface Props {
    data: CommandPrint[];
}

export default function MonitorPaperCommandPrintList ({data} : Props) {

    return (
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">인쇄전표번호</th>
                        <th className="border px-2 py-1">인쇄소</th>
                        <th className="border px-2 py-1">인쇄일</th>
                        <th className="border px-2 py-1">사용량</th>
                        <th className="border px-2 py-1">모델#</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">부수</th>
                        <th className="border px-2 py-1">S</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.statementNum}</td>
                        <td className="border px-2 py-1">{s.printCompanyName}</td>
                        <td className="border px-2 py-1">{s.iDate}</td> {/* iDate 아니면 rDate 중 1개 */}
                        <td className="border px-2 py-1">사용량</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">부수</td>
                        <td className="border px-2 py-1">내/표</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}