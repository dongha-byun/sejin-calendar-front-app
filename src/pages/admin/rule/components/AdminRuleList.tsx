import type { AdminAuth } from "../../../../types/admin/AdminAuth";

interface Props {
    data: AdminAuth[];
}

export default function AdminRuleList({data}: Props) {

    return(
        <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">메뉴권한아이디</th>
                        <th className="border px-2 py-1">이름</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.authMenuId}</td>
                        <td className="border px-2 py-1">{s.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}