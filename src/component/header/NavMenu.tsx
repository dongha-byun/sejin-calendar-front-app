import React from "react";
import type { MenuItem } from "../../types/menu/MenuItem";

interface Props {
    items: MenuItem[];
    depth?: number;
}

const NavMenu: React.FC<Props> = ({ items, depth = 1 }) => {
    const getBgColor = () => {
      switch (depth) {
        case 1: return "bg-purple-700";
        case 2: return "bg-purple-600";
        default: return "bg-purple-500";
      }
    };
  
    const getHoverBgColor = () => {
      switch (depth) {
        case 1: return "hover:bg-purple-600";
        case 2: return "hover:bg-purple-500";
        default: return "hover:bg-purple-400";
      }
    };
  
    return (
      <ul
        className={`${
          depth === 1
            ? "flex space-x-4 px-6 py-3"
            : `absolute mt-1 hidden group-hover:block z-50 shadow-lg rounded ${getBgColor()}`
        }`}
      >
        {items.map((item, idx) => (
          <li key={idx} className={`relative group`}>
            {item.link ? (
              <a
                href={item.link}
                className={`block px-4 py-2 rounded ${getHoverBgColor()}`}
              >
                {item.name}
              </a>
            ) : (
              <button
                className={`block px-4 py-2 rounded cursor-default ${getHoverBgColor()}`}
              >
                {item.name}
              </button>
            )}
  
            {item.children && (
              <NavMenu
                items={item.children}
                depth={depth + 1}
              />
            )}
          </li>
        ))}
      </ul>
    );
};

export default NavMenu;