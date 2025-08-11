import type { AdminMember } from "../../../../types/admin/AdminMember";

interface Props {
    data: AdminMember[];
}

export default function AdminMemberTable({data}: Props) {

    return (
        <div className="overflow-x-auto min-h-[500px] overflow-y-auto bg-white">
            <table className="table-auto border text-sm w-full">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="border px-2 py-1">ID</th>
                        <th className="border px-2 py-1">이름</th>
                        <th className="border px-2 py-1">주소</th>
                        <th className="border px-2 py-1">전화번호</th>
                        <th className="border px-2 py-1">email</th>
                    </tr>
                </thead>
                <tbody>
                {data.map((s, idx) => (
                    <tr key={s.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border px-2 py-1">{s.userId}</td>
                        <td className="border px-2 py-1">{s.name}</td>
                        <td className="border px-2 py-1">{s.addr1}</td>
                        <td className="border px-2 py-1">{s.tel1}</td>
                        <td className="border px-2 py-1">{s.email}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div> 
    );
}