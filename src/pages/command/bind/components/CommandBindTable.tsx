import type { CommandBindDto } from "../../../../types/command/CommandBind";

interface Props {
  data: CommandBindDto[];
}

export default function CommandBindTable({ data }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">제본소명</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">제본방식</th>
                        <th className="border px-2 py-1">수량</th>
                        <th className="border px-2 py-1">인쇄소명</th>
                        <th className="border px-2 py-1">지시일자</th>
                        <th className="border px-2 py-1">지시사항</th>
                        <th className="border px-2 py-1">비고</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.id}</td>
                        <td className="border px-2 py-1">{s.bindCompanyName}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">{s.bindMethod}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCompanyName}</td>
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