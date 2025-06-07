// Navbar.tsx
import React, { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import { menuApi } from "../../api/menu/menu";
import type { MenuItem } from "../../types/menu/MenuItem";

const Header: React.FC = () => {
    const [menus, setMenus] = useState<MenuItem[]>([]);

    useEffect(() => {
        menuApi.list().then(setMenus);
    },[]);

    return (
        <nav className="bg-purple-700 text-white">
            <NavMenu items={menus} depth={1} />
        </nav>
    );
};

export default Header;
