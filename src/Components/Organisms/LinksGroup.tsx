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


  const paddingLeft = `${level * 8}px`;
  const backgroundColor = isOpened ? "#BDC4C3" : "transparent";
  const textColor = isActive ? "text-[#c30000]" : "text-[#1D1F2C]";
  const fontSize = level === 1 ? "text-[14px]" : level === 2 ? "text-[13px]" : "text-[12px]";
  const fontWeight = level === 1 ? "font-normal" : "font-normal";
  const lineHeight = level === 1 ? "leading-[24px]" : level === 2 ? "leading-[21px]" : "leading-[19px]";


  return (
    <>
      <UnstyledButton
        onClick={toggleOpen}
        className={`rounded-xl w-full text-left transition-all duration-300 ease-in-out`}
        style={{ padding: "4px 8px", paddingLeft, backgroundColor }}
      >
        <Group justify="space-between" gap="sm">

          <Box className="flex items-center">
            {Icon && (
              <Icon
                width={Math.max(24 - level * 2, 14)} // shrink size as depth increases
                height={Math.max(24 - level * 2, 14)}
              />
            )}
            <Box
              className={`${fontSize} ${fontWeight} ${lineHeight} ${isActive ? "pl-4" : "pl-2"} transition-all duration-300 ease-in-out font-poppins whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px] ${textColor}`}
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
              stroke={1.5}
              size={16}
              className={`transition-transform ${isOpened ? "rotate-[-90deg]" : "rotate-0"}`}
            />
          )}
        </Group>
      </UnstyledButton >

      {hasChildren && (
        <Collapse in={!!isOpened}>
          <Box className="flex flex-col">
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
