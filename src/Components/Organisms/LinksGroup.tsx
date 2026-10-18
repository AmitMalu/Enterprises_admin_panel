import {
  Box,
  Collapse,
  Group,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

interface linksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: Array<Omit<linksGroupProps, "openMap" | "setOpenMap">>;
  level?: number;
  openMap: Record<string, { level: number }>;
  setOpenMap: React.Dispatch<React.SetStateAction<Record<string, { level: number }>>>;
}

const LinksGroup: React.FC<linksGroupProps> = ({
  icon: Icon,
  label,
  links,
  link,
  level = 1,
  openMap,
  setOpenMap,
}: linksGroupProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const hasChildren = Array.isArray(links);
  const isActive = link
    ? pathname === link || pathname.startsWith(`${link}/`)
    : false;

  const isOpened = openMap[label]?.level === level;

  const toggleOpen = () => {
    if (hasChildren) {
      setOpenMap((prev) => {
        const newMap: Record<string, { level: number }> = {};
        Object.entries(prev).forEach(([key, val]) => {
          if (val.level !== level) {
            newMap[key] = val;
          }
        });
        if (!isOpened) {
          newMap[label] = { level };
        }
        return newMap;
      });
    } else if (link) {
      navigate(link);
    }
  };

  React.useEffect(() => {
    const shouldBeOpened =
      hasChildren &&
      links?.some((child) =>
        child.link
          ? pathname.startsWith(child.link)
          : child.links?.some((sub) => pathname.startsWith(sub.link ?? ""))
      );

    if (shouldBeOpened) {
      setOpenMap((prev) => ({
        ...prev,
        [label]: { level },
      }));
    }
  }, [pathname]);


  const paddingLeft = `${4 + (level - 1) * 14}px`;
  const backgroundColor = isActive
    ? "rgba(16, 185, 129, 0.14)"
    : isOpened
      ? "var(--color-sidebar-open)"
      : "transparent";
  const textColor = isActive ? "text-[var(--color-sidebar-active)] font-semibold" : "text-[var(--color-sidebar-text)]";
  const iconColor = isActive ? "var(--color-sidebar-active)" : "var(--color-sidebar-text-muted)";
  const fontSize = level === 1 ? "text-[14px]" : level === 2 ? "text-[13px]" : "text-[12px]";
  const fontWeight = level === 1 ? "font-medium" : "font-normal";
  const lineHeight = level === 1 ? "leading-[24px]" : level === 2 ? "leading-[21px]" : "leading-[19px]";

  return (
    <>
      <UnstyledButton
        onClick={toggleOpen}
        className={`relative rounded-lg w-full text-left transition-colors duration-200 ease-in-out hover:bg-[var(--color-sidebar-hover)]`}
        style={{ padding: level === 1 ? "8px 10px" : "6px 10px", paddingLeft, backgroundColor }}
      >
        <Group justify="space-between" gap="sm">

          <Box className="flex items-center">
            {Icon && (
              <Icon
                width={Math.max(22 - level * 2, 14)} // shrink size as depth increases
                height={Math.max(22 - level * 2, 14)}
                color={iconColor}
              />
            )}
            <Box
              className={`${fontSize} ${fontWeight} ${lineHeight} pl-3 transition-colors duration-200 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px] ${textColor}`}
            >
              <Tooltip.Floating
                label={label}
                position="top-end"
                disabled={label.length <= 18} // how only when long
                key={label}
              >
                <span>{label}</span>
              </Tooltip.Floating>
            </Box>
          </Box>
          {hasChildren && (
            <IconChevronRight
              stroke={1.75}
              size={15}
              color="var(--color-sidebar-text-muted)"
              className={`transition-transform ${isOpened ? "rotate-[-90deg]" : "rotate-0"}`}
            />
          )}
        </Group>
      </UnstyledButton >

      {hasChildren && (
        <Collapse in={!!isOpened}>
          <Box className="flex flex-col gap-0.5 mt-0.5 ml-3 border-l border-[var(--color-sidebar-border)]">
            {links.map((child) => (
              <LinksGroup key={child.label} {...child} level={level + 1} openMap={openMap}
                setOpenMap={setOpenMap} />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  );
};

export default LinksGroup;
