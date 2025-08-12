import { useEffect, useState } from "react";
import type { MenuItem } from "../../../types/menu/MenuItem";
import AdminAuthFirstTable from "./components/AdminAuthFirstTable";
import type { AdminMember } from "../../../types/admin/AdminMember";
import AdminAuthSecondTable from "./components/AdminAuthSecondTable";
import type { AdminAuth } from "../../../types/admin/AdminAuth";
import AdminMenuTree from "./components/AdminMenuTree";
import { menuApi } from "../../../api/menu/menu";

export default function AdminAuthPage() {
    const [members, setMembers] = useState<AdminMember[]>([]);
    const [auths, setAuths] = useState<AdminAuth[]>([]);
    const [menus, setMenus] = useState<MenuItem[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem("members");
        if (saved) setMembers(JSON.parse(saved));

        menuApi.list().then(setMenus);
    }, []);

    useEffect(() => {
        localStorage.setItem("members", JSON.stringify(members));
        localStorage.setItem("auths", JSON.stringify(auths));
    }, [members, auths]);

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">관리자 - 권한관리</h1>
            <div className="grid grid-cols-3 gap-4 p-3 border border-white-500">
                <AdminAuthFirstTable data={members} />
                <AdminAuthSecondTable data={auths} />
                <AdminMenuTree data={menus} />
            </div>
        </div>
    );
}