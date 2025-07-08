import {
  Box,
  Collapse,
  Group,
  ScrollArea,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setActiveMenu,
  setActiveSubMenu,
  setMenuOpen,
} from "../../Redux/Features/Menu/MenuReducer";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";

interface linksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened: boolean;
  link?: string;
  links?: { label: string; link: string; icon?: React.FC<any> }[];
}

const LinksGroup: React.FC<linksGroupProps> = ({
  icon: Icon,
  label,
  links,
  link,
  initiallyOpened,
}: linksGroupProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const { openedMenu } = useAppSelector(
    (state) => state.menu
  );
  const hasLinks = Array.isArray(links);
  const isOpened = openedMenu === label;

  const isActiveMenu = hasLinks
    ? links.some((l) => pathname.startsWith(l.link))
    : link && pathname.startsWith(link);

  const handleClick = () => {
    dispatch(setMenuOpen(label)); // also toggles openedMenu inside reducer
    if (!hasLinks && link) {
      // dispatch(setActiveSubMenu(null)); // Clear submenu selection
      navigate(link); // navigate directly if no submenu
    }
  };

  const items = hasLinks
    ? links.map((link) => {
      const isActive = pathname.startsWith(link.link);
      return (
        <Tooltip.Floating
          label={link.label}
          position="top-end"
          disabled={link.label.length <= 25} // how only when long
          key={link.label}
        >
          <a
            key={link.label}
            onClick={() => {
              // dispatch(setActiveSubMenu(link.label));
              navigate(link.link); // no <a> tag used
            }}
            className={`flex items-center gap-2 cursor-pointer text-[12px] font-poppins font-normal px-4 py-1 rounded-xl ${isActive ? "text-submenuActive" : "text-black"
              } bg-submenuBg`}
          >
            {link.icon && <link.icon />}
            <span className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]">
              {link.label}
            </span>
          </a>
        </Tooltip.Floating>
      );
    })
    : null;

  return (
    <>
      <UnstyledButton
        className={`rounded-xl w-full text-left transition`}
        onClick={handleClick}
        style={{
          backgroundColor: hasLinks
            ? isOpened
              ? "#BDC4C3"
              : "transparent"
            : pathname.startsWith(link ?? "")
              ? "#BDC4C3"
              : "transparent",
          padding: "4px 8px",
        }}
      >
        <Group justify="space-between" gap="sm">
          <Box className="flex items-center">
            <Icon />
            <Box
              className="ml-4 text-[16px] font-poppins font-normal leading-[27px]"
              style={{
                color:
                  !hasLinks && pathname === link
                    ? "#c30000"
                    : "#1D1F2C",
              }}
            >
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              size={16}
              style={{ transform: isOpened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>

      {hasLinks ? (
        <Collapse in={!!isOpened}>
          <Box className="flex flex-col">{items}</Box>
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
