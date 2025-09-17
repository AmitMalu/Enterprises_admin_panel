import { Menu, ScrollArea, Checkbox } from "@mantine/core";
import ButtonComponent from "../Atoms/ButtonComponent";
import { ColIcon } from "../../assets/Icons";
import { GenericTableHeader } from "../../Utils/utils";

interface ColumnVisibilityMenuProps {
  headers: GenericTableHeader<any>[];
  visibleColumns: string[];
  onToggleColumn: (key: string) => void;
}

const ColumnVisibilityMenu: React.FC<ColumnVisibilityMenuProps> = ({
  headers,
  visibleColumns,
  onToggleColumn,
}) => {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ButtonComponent
          style={{ padding: "4px 8px", height: 32 }}
          radius={1}
          textColor="#000000"
          borderColor="#CACACA"
          fontSize="16"
          bgColor="#ffffff"
          throttleMs={0}
          leftIcon={<ColIcon />}
        >
          Cols
        </ButtonComponent>
      </Menu.Target>

      <Menu.Dropdown>
        <ScrollArea.Autosize mah={200} px="xs">
          {headers?.map((h) => (
            <Menu.Label key={String(h.key)}>
              <Checkbox
                label={(h.label as string) || (h.key as string)}
                checked={visibleColumns.includes(h.key as string)}
                onChange={() => onToggleColumn(h.key as string)}
              />
            </Menu.Label >
          ))}
        </ScrollArea.Autosize>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ColumnVisibilityMenu;
