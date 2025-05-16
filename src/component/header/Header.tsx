// Navbar.tsx
import React from "react";
import NavMenu from "./NavMenu";
import { FakeMenus } from "../../types/menu/MenuItem";

const Header: React.FC = () => {
    const menuData = FakeMenus;

    return (
        <nav className="bg-purple-700 text-white">
            <NavMenu items={menuData} depth={1} />
        </nav>
    );
};

export default Header;
