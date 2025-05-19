// Navbar.tsx
import React from "react";
import NavMenu from "./NavMenu";
import { useMenus } from "../../hooks/useMenus";

const Header: React.FC = () => {
    // const menuData = FakeMenus;
    const {data, isLoading, error} = useMenus();

    if(isLoading) {
        return <div>로딩 중 ...</div>;
    }

    if(error) {
        console.log(error);
        return <div>오류 발생</div>;
    }

    return (
        <nav className="bg-purple-700 text-white">
            <NavMenu items={data} depth={1} />
        </nav>
    );
};

export default Header;
