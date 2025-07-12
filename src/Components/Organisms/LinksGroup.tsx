import {
  Box,
  Collapse,
  Group,
  Tooltip,
  UnstyledButton,
} from "@mantine/core";
import React, { useEffect } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
}: linksGroupProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openedMenu } = useAppSelector((state) => state.menu); //Open close menu state using redux

  const hasLinks = Array.isArray(links);
  const isOpened = openedMenu === label; // Check if the current menu is opened
  const isDirectMenuActive = !hasLinks && pathname === link; // Check if the current menu is a direct link and active

  const handleClick = () => {
    dispatch(setMenuOpen(hasLinks ? label : "")); // Toggle the menu open state
    if (!hasLinks && link) {
      navigate(link); // Navigate to the link if it's a direct link
    }
  };

  // Generate menu items if links are provided
  const items = hasLinks
    ? links.map((link) => {
      const isActive = pathname.startsWith(link.link); // Check if the current path starts with the link's path
      return (
        <Tooltip.Floating
          label={link.label}
          position="top-end"
          disabled={link.label.length <= 25} // how only when long
          key={link.label}
        >
          <a
            onClick={() => navigate(link.link)}
            key={link.label}
            className={`flex items-center gap-2 cursor-pointer text-[12px] bg-submenuBg font-poppins 
              font-normal px-4 py-1 rounded-xl ${isActive ? "text-submenuActive" : "text-black"}`}
          >
            {link.icon && <link.icon width={16} height={16} />}
            <span className={`${isActive ? "pl-2" : ""} transition-all duration-500 ease-in-out whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px]`}>
              {link.label}
            </span>
          </a>
        </Tooltip.Floating>
      );
    })
    : null;

  useEffect(() => {
    if (
      hasLinks &&
      !isOpened && // Only if not already opened
      links?.some((l) => pathname.startsWith(l.link))
    ) {
      dispatch(setMenuOpen(label));
    }
    // Only on initial mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <UnstyledButton
        onClick={handleClick}
        className={`rounded-xl w-full text-left transition-all duration-300 ease-in-out`}
        style={{
          backgroundColor:
            isOpened
              ? "#BDC4C3"
              : "transparent",
          padding: "4px 8px",
        }}
      >
        <Group justify="space-between" gap="sm">
          <Box className="flex items-center">
            <Icon />
            <Box
              className={`ml-4 text-[16px] font-poppins font-normal leading-[27px] ${isDirectMenuActive ?
                "text-[#c30000]" : "text-[#1D1F2C]"
                } ${isDirectMenuActive || isOpened ? "pl-2" : ""} transition-all duration-500 ease-in-out`}
            >
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              size={16}
              className={`transition-transform ${isOpened ? "rotate-[-90deg]" : "rotate-0"}`}
            />
          )}
        </Group>
      </UnstyledButton >

      {
        hasLinks ? (
          <Collapse in={!!isOpened} >
            <Box className="flex flex-col">{items}</Box>
          </Collapse >
        ) : null}
    </>
  );
};

export default LinksGroup;
