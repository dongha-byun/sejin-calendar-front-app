import React, { useEffect, useState } from "react";
import type { MenuItem } from "../../types/menu/MenuItem";

interface DynamicTreeProps {
  menus: MenuItem[];
}

export default function DynamicTree({ menus }: DynamicTreeProps) {
  const [tree, setTree] = useState<MenuItem[]>(menus);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    setTree(menus);
  }, [menus]);

  function toggleExpand(id: string) {
    setExpandedIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }

  return (
    <ul className="space-y-0.5">
    {tree
        .sort((a, b) => a.order - b.order)
        .map((menu) => (
        <TreeNode
            key={menu.id}
            node={menu}
            expandedIds={expandedIds}
            onToggle={toggleExpand}
            level={0}
        />
        ))}
    </ul>
  );
}

function TreeNode({
  node,
  expandedIds,
  onToggle,
  level,
}: {
  node: MenuItem;
  expandedIds: Set<string>;
  onToggle: (id: string) => void;
  level: number;
}) {
  const hasChildren = node.childMenus && node.childMenus.length > 0;
  const expanded = expandedIds.has(node.id);

  return (
    <li>
      <div
        className="flex items-center gap-1 p-1 rounded hover:bg-gray-50"
        style={{ paddingLeft: `${level * 1}rem` }}
      >
        {hasChildren && (
          <button
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-gray-100 text-xs"
            onClick={() => onToggle(node.id)}
          >
            {expanded ? "-" : "+"}
          </button>
        )}
        {!hasChildren && <span className="w-5 h-5" />}
        {node.path ? (
          <a href={node.path} className="text-xs text-violet-700 hover:underline">
            {node.name}
          </a>
        ) : (
          <span className="text-xs">{node.name}</span>
        )}
      </div>

      {hasChildren && expanded && (
        <ul className="pl-3">
          {node.childMenus!
            .sort((a, b) => a.order - b.order)
            .map((child) => (
              <TreeNode
                key={child.id}
                node={child}
                expandedIds={expandedIds}
                onToggle={onToggle}
                level={level + 1}
              />
            ))}
        </ul>
      )}
    </li>
  );
}