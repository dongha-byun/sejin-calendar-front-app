export interface MenuItem {
    name: string;
    link?: string;
    children?: MenuItem[];
}

export const FakeMenus: MenuItem[] = [
    {
        name: "메뉴1",
        children: [
            {
            name: "하위1-1",
            children: [
                { name: "하위1-1-1", link: "#" },
                { name: "하위1-1-2", link: "#" },
            ],
            },
            { name: "하위1-2", link: "#" },
        ],
    },
    {
        name: "메뉴2",
        children: [
            { name: "하위2-1", link: "#" },
            { name: "하위2-2", link: "#" },
        ],
    },
    { 
        name: "메뉴3", link: "#" 
    },
]
  