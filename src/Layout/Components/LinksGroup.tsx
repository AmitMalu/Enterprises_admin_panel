import { Box, Collapse, Group, ThemeIcon, UnstyledButton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React from "react";
import { IconChevronRight } from "@tabler/icons-react";

interface linksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened: boolean;
  links?: { label: string; link: string }[];
}

const LinksGroup: React.FC<linksGroupProps> = ({
  icon: Icon,
  label,
  links,
  initiallyOpened,
}: linksGroupProps) => {
  const [opened, { toggle }] = useDisclosure(initiallyOpened);
  const hasLinks = Array.isArray(links);

  const items = hasLinks
    ? links.map((link) => (
        <a
          key={link.label}
          href={link.link}
          className="pl-8 text-sm font-poppins font-normal leading-[16px] text-black mt-0 py-1"
        >
          {link.label}
        </a>
      ))
    : null;

  return (
    <>
      <UnstyledButton
        onClick={toggle}
        className="w-full px-4 py-2 text-left hover:bg-gray-100 transition rounded"
      >
        <Group justify="space-between" gap="sm" className="mb-2">
          <Box className="flex items-center">
            <Icon />
            <Box className="ml-4 text-xl font-poppins font-normal leading-[27px] text-black">
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              stroke={1.5}
              size={16}
              style={{ transform: opened ? "rotate(-90deg)" : "none" }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? (
        <Collapse in={opened}>
          <Box className="flex flex-col">
            {items}
          </Box>
        </Collapse>
      ) : null}
    </>
  );
};

export default LinksGroup;
