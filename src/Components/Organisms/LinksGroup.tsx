import { Box, Collapse, Group, UnstyledButton } from "@mantine/core";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import {
  setActiveMenu,
  setActiveSubMenu,
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
  const hasLinks = Array.isArray(links);
  const { activeMenu, activeSubMenu, openedMenu } = useAppSelector(
    (state) => state.menu
  );

  const isActiveMenu = label === activeMenu;
  const isOpened = label === openedMenu;

  const handleClick = () => {
    dispatch(setActiveMenu(label)); // also toggles openedMenu inside reducer

    if (!hasLinks && link) {
      dispatch(setActiveSubMenu(null)); // Clear submenu selection
      navigate(link); // navigate directly if no submenu
    }
  };

  const items = hasLinks
    ? links.map((link) => {
        const isActive = link.label === activeSubMenu;
        return (
          <a
            key={link.label}
            onClick={() => {
              dispatch(setActiveSubMenu(link.label));
              navigate(link.link); // no <a> tag used
            }}
            className={`flex items-center gap-2 cursor-pointer text-sm font-poppins font-normal px-4 py-1 rounded-xl ${
              isActive ? "text-submenuActive" : "text-black"
            } bg-submenuBg`}
          >
            {link.icon && <link.icon />}
            {link.label}
          </a>
        );
      })
    : null;

  return (
    <>
      <UnstyledButton
        className={`rounded-xl w-full text-left transition`}
        onClick={handleClick}
        style={{
          backgroundColor: isOpened ? "#BDC4C3" : "transparent",
          padding: "8px 4px",
        }}
      >
        <Group justify="space-between" gap="sm">
          <Box className="flex items-center">
            <Icon />
            <Box className="ml-4 text-lg font-poppins font-normal leading-[27px] text-black">
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
        <Collapse in={isOpened}>
          <Box className="flex flex-col">{items}</Box>
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
