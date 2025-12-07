import type { Material } from "../../../../types/baseinfo/Material";

interface Props {
  data: Material[];
}
export default function MaterialTable({ data }: Props) {
    return (
        <div className="overflow-x-auto overflow-y-auto max-w-[50vw] h-[500px] bg-white pb-4 -mb-4">
            <table className="table w-full min-w-max border text-sm bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">분류</th>
                        <th className="border px-2 py-1">규격1</th>
                        <th className="border px-2 py-1">규격2</th>
                        <th className="border px-2 py-1">내역</th>
                        <th className="border px-2 py-1">색상</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1 text-center">{s.id}</td>
                        <td className="border px-2 py-1">{s.bindMethod}</td>
                        <td className="border px-2 py-1">{s.standard1}</td>
                        <td className="border px-2 py-1">{s.standard2}</td>
                        <td className="border px-2 py-1">{s.contents}</td>
                        <td className="border px-2 py-1">{s.color}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}