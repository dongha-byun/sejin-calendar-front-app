import type { DiaryMachine } from "../../../../types/diary/DiaryMachine";



interface Props {
  data: DiaryMachine[];
}

export default function DiaryMachineTable({ data }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto w-full border text-sm">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">기계</th>
                        <th className="border px-2 py-1">작업일</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">수량</th>
                        <th className="border px-2 py-1">상호</th>
                        <th className="border px-2 py-1">비고</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.id}</td>
                        <td className="border px-2 py-1">{s.machineNum}</td>
                        <td className="border px-2 py-1">{s.modelNum}</td>
                        <td className="border px-2 py-1">{s.modelName}</td>
                        <td className="border px-2 py-1">{s.amount}</td>
                        <td className="border px-2 py-1">{s.printCn}</td>
                        <td className="border px-2 py-1">{s.iDate}</td>
                        <td className="border px-2 py-1">{s.etc}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}