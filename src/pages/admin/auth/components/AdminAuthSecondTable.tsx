import type { AdminAuth } from "../../../../types/admin/AdminAuth";

interface Props {
    data: AdminAuth[];
}

export default function AdminAuthSecondTable({data}: Props) {
    return (
        <div>
            <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
                <table className="table-auto border text-sm w-full">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-2 py-1">메뉴권한아이디</th>
                            <th className="border px-2 py-1">이름</th>
                            <th className="border px-2 py-1">기타</th>
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border px-2 py-1">{s.authMenuId}</td>
                            <td className="border px-2 py-1">{s.name}</td>
                            <td className="border px-2 py-1">{s.etc}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2 flex justify-end items-center text-sm gap-3">
                <button className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">Rule 관리</button>
            </div>
        </div>
    );
}