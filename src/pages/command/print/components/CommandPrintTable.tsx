import type { CommandPrint } from "../../../../types/command/CommandPrint";

interface Props {
    data: CommandPrint[];
}
export default function CommandPrintTable({ data }: Props) { 
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">전표번호</th>
                        <th className="border px-2 py-1">인쇄소명</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">수량</th>
                        <th className="border px-2 py-1">여분</th>
                        <th className="border px-2 py-1">총수량</th>
                        <th className="border px-2 py-1">무게(표)</th>
                        <th className="border px-2 py-1">지질(표)</th>
                        <th className="border px-2 py-1">규격(표)</th>
                        <th className="border px-2 py-1">용지량(표)</th>
                        <th className="border px-2 py-1">소부(표)</th>
                        <th className="border px-2 py-1">도수(표)</th>
                        <th className="border px-2 py-1">무게(내)</th>
                        <th className="border px-2 py-1">지질(내)</th>
                        <th className="border px-2 py-1">규격(내)</th>
                        <th className="border px-2 py-1">용지량(내)</th>
                        <th className="border px-2 py-1">소부(내)</th>
                        <th className="border px-2 py-1">도수(내)</th>
                        <th className="border px-2 py-1">지시일</th>
                        <th className="border px-2 py-1">지시사항</th>
                        <th className="border px-2 py-1">비고</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.statementNum}</td>
                        <td className="border px-2 py-1">{s.printCompanyName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">{s.orderCount}</td>
                        <td className="border px-2 py-1">{s.spareCount}</td>
                        <td className="border px-2 py-1">{s.totalCount}</td>
                        <td className="border px-2 py-1">{s.coverWeight}</td>
                        <td className="border px-2 py-1">{s.coverProperties}</td>
                        <td className="border px-2 py-1">{s.coverStandard}</td>
                        <td className="border px-2 py-1">{s.coverRequirePaper}</td>
                        <td className="border px-2 py-1">{s.coverSobu}</td>
                        <td className="border px-2 py-1">{s.coverDosu}</td>
                        <td className="border px-2 py-1">{s.innerWeight}</td>
                        <td className="border px-2 py-1">{s.innerProperties}</td>
                        <td className="border px-2 py-1">{s.innerStandard}</td>
                        <td className="border px-2 py-1">{s.innerRequirePaper}</td>
                        <td className="border px-2 py-1">{s.innerSobu}</td>
                        <td className="border px-2 py-1">{s.innerDosu}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.contents}</td>
                        <td className="border px-2 py-1">{s.etc}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}