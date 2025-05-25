// Navbar.tsx
import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { menuService } from "../../api/menu/menuService";
import type { MenuItem } from "../../types/menu/MenuItem";

const Header: React.FC = () => {
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        menuService.list().then(setMenus);
    })

    return (
        <nav className="bg-purple-700 text-white">
            <NavMenu items={menus} depth={1} />
        </nav>
    );
};

export default Header;
