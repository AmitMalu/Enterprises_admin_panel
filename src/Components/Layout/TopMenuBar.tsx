import React, { useMemo } from "react";
import { Menu, ScrollArea, UnstyledButton } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { filterSidebarByPermissions } from "../../Utils/filterSidebarByPermissions";

interface MenuNode {
  label: string;
  icon?: React.FC<any>;
  link?: string;
  links?: MenuNode[];
}

const matchesPath = (pathname: string, link?: string) =>
  !!link && (link === "/" ? pathname === "/" : pathname === link || pathname.startsWith(`${link}/`));

const containsPath = (node: MenuNode, pathname: string): boolean =>
  matchesPath(pathname, node.link) || !!node.links?.some((child) => containsPath(child, pathname));

/** Horizontal menu bar that replaces the old left sidebar. */
const TopMenuBar: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const role = userInfo?.role || userInfo?.hierarchyId?.split("-")[1] || "";
  const permissionsKey = userInfo?.permissions || "";

  const items = useMemo(() => {
    const permissions = permissionsKey
      .split(",")
      .map((p: string) => p.trim())
      .filter(Boolean);
    return (filterSidebarByPermissions(role, permissions).filter(Boolean) as MenuNode[]);
  }, [role, permissionsKey]);

  const renderDropdownLinks = (links: MenuNode[]) => {
    const twoColumns = links.length > 8;
    return (
      <div className={twoColumns ? "grid grid-cols-2 gap-x-2" : "flex flex-col"}>
        {links.map((child) =>
          child.links?.length ? (
            <div key={child.label} className={twoColumns ? "col-span-2" : ""}>
              <Menu.Label className="!pt-3 !text-[10px] !font-semibold !uppercase !tracking-[0.14em]">
                {child.label}
              </Menu.Label>
              <div className={twoColumns ? "grid grid-cols-2 gap-x-2" : "flex flex-col"}>
                {child.links.map((sub) => renderLeaf(sub))}
              </div>
            </div>
          ) : (
            renderLeaf(child)
          )
        )}
      </div>
    );
  };

  const renderLeaf = (node: MenuNode) => {
    const active = matchesPath(pathname, node.link);
    return (
      <Menu.Item
        key={node.label}
        onClick={() => node.link && navigate(node.link)}
        className={`!rounded-md !text-[13px] ${active ? "!bg-emerald-50 !font-semibold !text-emerald-700" : "!text-slate-700"}`}
      >
        {node.label}
      </Menu.Item>
    );
  };

  return (
    <ScrollArea type="never" offsetScrollbars={false}>
      <nav className="flex h-12 items-stretch gap-0.5 whitespace-nowrap">
        {items.map((item) => {
          const active = containsPath(item, pathname);
          const trigger = (
            <UnstyledButton
              className={`relative flex items-center gap-1 !px-2.5 text-[13px] font-semibold transition-colors ${
                active ? "text-emerald-700" : "text-slate-600 hover:text-slate-900"
              }`}
              onClick={() => !item.links?.length && item.link && navigate(item.link)}
            >
              <span>{item.label}</span>
              {!!item.links?.length && <IconChevronDown size={14} stroke={2} />}
              {/* Active underline */}
              <span
                className={`absolute inset-x-3 bottom-0 h-[3px] rounded-t-full transition-opacity ${
                  active ? "bg-emerald-500 opacity-100" : "opacity-0"
                }`}
              />
            </UnstyledButton>
          );

          if (!item.links?.length) {
            return <React.Fragment key={item.label}>{trigger}</React.Fragment>;
          }

          return (
            <Menu
              key={item.label}
              trigger="click-hover"
              openDelay={60}
              closeDelay={120}
              position="bottom-start"
              offset={4}
              radius="md"
              shadow="lg"
              withinPortal
              width={item.links.length > 8 ? 480 : 240}
            >
              <Menu.Target>{trigger}</Menu.Target>
              <Menu.Dropdown className="!p-2">
                <Menu.Label className="!text-[11px] !font-bold !text-slate-900">{item.label}</Menu.Label>
                {renderDropdownLinks(item.links)}
              </Menu.Dropdown>
            </Menu>
          );
        })}
      </nav>
    </ScrollArea>
  );
};

export default TopMenuBar;
