import type { Paper } from "../../../../types/baseinfo/Paper";

interface Props {
  data: Paper[];
}

export default function PaperTable({ data }: Props) {
    return (
        <div className="overflow-x-auto overflow-y-auto max-w-[30vw] h-[500px] bg-white pb-4 -mb-4">
            <table className="table w-full min-w-max border text-sm bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">Weight</th>
                        <th className="border px-2 py-1">지질</th>
                        <th className="border px-2 py-1">규격</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1 text-center">{s.id}</td>
                        <td className="border px-2 py-1">{s.weight}</td>
                        <td className="border px-2 py-1">{s.properties}</td>
                        <td className="border px-2 py-1">{s.standard}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}