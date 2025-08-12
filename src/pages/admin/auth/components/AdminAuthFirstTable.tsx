import type { AdminMember } from "../../../../types/admin/AdminMember";

interface Props {
    data: AdminMember[];
}

export default function AdminAuthFirstTable({data} : Props) {

    return (
        <div>
            <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
                <table className="table-auto border text-sm w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">아이디</th>
                            <th className="border px-2 py-1">이름</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.userId}</td>
                            <td className="border px-2 py-1">{s.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex justify-end items-center text-sm gap-3">
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">저장</button>
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">취소</button>
            </div>
        </div>
    );
    
}