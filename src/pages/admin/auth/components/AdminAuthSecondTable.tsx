import type { AdminAuth } from "../../../../types/admin/AdminAuth";

interface Props {
    data: AdminAuth[];
}

export default function AdminAuthSecondTable({data}: Props) {

    const openRulePopup = () => {
        // 팝업 window의 크기 지정
        const width = 1080; 
        const height = 900; 
        
        // 팝업을 부모 브라우저의 정 중앙에 나열
        const left = window.screenX + (window.outerWidth - width) / 2;
        const top = window.screenY + (window.outerHeight - height) / 2;
        const windowFeatures = `width=${width},height=${height},left=${left},top=${top}`;
        
        // 팝업을 열고 window 속성 지정
        const popup = window.open('/admin/auth/rule', 'authRulePop', windowFeatures);
    };

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
                <button type="button" onClick={openRulePopup} className="max-w-[120px] px-3 py-1 bg-gray-300 rounded hover:bg-gray-400">
                    Rule 관리
                </button>
            </div>
        </div>
    );
}