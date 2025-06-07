// Navbar.tsx
import React, { useEffect, useState } from "react";
import { menuApi } from "../../api/menu/menu";
import type { MenuItem } from "../../types/menu/MenuItem";

const Header: React.FC = () => {
    const [menus, setMenus] = useState<MenuItem[]>([]);
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    // 최대 childMenus 길이 추출 (하위 메뉴 행 수 맞추기 위해)
    const sortedMenus = menus.sort((a, b) => a.order - b.order);
    const maxChildCount = Math.max(
        ...sortedMenus.map((menu) => menu.childMenus?.length || 0)
    );

    const handleTopMenuClick = () => {
        setIsSubmenuOpen((prev) => !prev);
    };

    useEffect(() => {
        menuApi.list().then(setMenus);
    },[]);

    return (
        <nav className="relative bg-purple-700 text-white">
            <div className="flex space-x-6 px-6 py-3">
                {/* <NavMenu items={menus} depth={1} /> */}
                {menus
                    .sort((a, b) => a.order - b.order)
                    .map(menu => (
                        <button
                            key={menu.id}
                            className="px-4 py-2 rounded hover:bg-purple-600 transition"
                            onClick={handleTopMenuClick}
                        >
                        {menu.name}
                        </button>
                    ))
                }
            </div>

            {/* 모든 하위 메뉴를 한 번에 펼침 */}
            {isSubmenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white text-gray-800 shadow-md border-t border-gray-200 animate-fadeIn z-10">
                <div className="grid grid-cols-11 gap-8 p-6">
                    {sortedMenus.map((menu) => (
                    <div key={menu.id}>
                        <div className="font-semibold text-purple-700 mb-2">
                        {menu.name}
                        </div>
                        <ul className="space-y-1">
                        {(menu.childMenus || []).sort((a, b) => a.order - b.order).map(
                            (child) => (
                            <li key={child.id}>
                                <a
                                href={child.path || "#"}
                                className="hover:text-purple-600 transition"
                                >
                                {child.name}
                                </a>
                            </li>
                            )
                        )}
                        </ul>
                    </div>
                    ))}
                </div>
                </div>
            )}
        </nav>
    );
};

export default Header;
