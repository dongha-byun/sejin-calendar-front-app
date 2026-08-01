import type { EtcSampleDto } from "../../../../types/etc/EtcSample";

interface Props {
    data: EtcSampleDto[];
}

export default function EtcSampleTable({ data }: Props) {
    return (
        <div className="overflow-x-auto overflow-y-auto h-full bg-white max-w-[50vw]">
            <table className="table w-full min-w-max border text-sm bg-white">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">번호</th>
                        <th className="border px-2 py-1">모델</th>
                        <th className="border px-2 py-1">모델명</th>
                        <th className="border px-2 py-1">일자</th>
                        <th className="border px-2 py-1">수량</th>
                        <th className="border px-2 py-1">비고</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id ?? idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1 text-center">{s.id}</td>
                            <td className="border px-2 py-1">{s.modelNum}</td>
                            <td className="border px-2 py-1">{s.modelName}</td>
                            <td className="border px-2 py-1 text-center">{s.orderDate}</td>
                            <td className="border px-2 py-1 text-right">{s.amount}</td>
                            <td className="border px-2 py-1">{s.etc}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
