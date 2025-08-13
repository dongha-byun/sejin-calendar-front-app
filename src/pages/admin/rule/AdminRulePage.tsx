import { useEffect, useState } from "react";
import type { AdminAuth } from "../../../types/admin/AdminAuth";
import AdminRuleList from "./components/AdminRuleList";
import AdminRuleFormSection from "./components/AdminRuleFormSection";
import AdminRuleAccessableMenuTree from "./components/AdminRuleAccessableMenuTree";
import AdminRuleAllMenuTree from "./components/AdminRuleAllMenuTree";
import type { MenuItem } from "../../../types/menu/MenuItem";
import { menuApi } from "../../../api/menu/menu";
import { LeftArrowIcon, RightArrowIcon } from "../../../component/icons/ArrowIcons";

export default function AdminRulePage() {

    const [auths, setAuths] = useState<AdminAuth[]>([]);
    const [accessableMenus, setAccessableMenus] = useState<MenuItem[]>([]);
    const [allMenus, setAllMenus] = useState<MenuItem[]>([]);
    
      useEffect(() => {
        const saved = localStorage.getItem("auths");
        if (saved) setAuths(JSON.parse(saved));

        menuApi.list().then(setAllMenus);
      }, []);
    
      useEffect(() => {
        localStorage.setItem("auths", JSON.stringify(auths));
        localStorage.setItem("accessableMenus", JSON.stringify(accessableMenus));
        localStorage.setItem("allMenus", JSON.stringify(allMenus));
      }, [auths, allMenus]);
    
      const addRule = (rule: AdminAuth) => {
        setAuths(prev => [...prev, rule]);
      };

    return (
        <div className="px-6 py-3">
            <h1 className="text-base font-semibold pb-2">Rule 관리</h1>
            <div className="grid gap-4 p-3 border border-white-500" style={{gridTemplateColumns: '1fr 1fr 3rem 1fr'}}>
                <AdminRuleList data={auths} />
                <AdminRuleAccessableMenuTree menus={accessableMenus} />
                <div className="flex flex-col gap-2 place-self-center">
                    <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center">
                        <RightArrowIcon className="w-5 h-5 text-gray-700" />
                    </button>
                    <button className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 flex items-center justify-center">
                        <LeftArrowIcon className="w-5 h-5 text-gray-700" />
                    </button>
                </div>
                <AdminRuleAllMenuTree menus={allMenus} />
            </div>
            <AdminRuleFormSection onAdd={addRule} />
        </div>
    );
}