import { Checkbox, Menu, ScrollArea } from "@mantine/core";
import {
  AddIconSvg,
  ColIcon,
  DownloadIcon,
  FilterIcon,
  RefreshIcon,
} from "../../assets/Icons";
import ButtonComponent from "../Atoms/ButtonComponent";
import { GenericTableHeader } from "../../Utils/utils";
import ColumnVisibilityMenu from "../Molecules/ColumnVisibilityMenu";

type GenericMasterToolbarProps = {
  addButtonText: string;
  onAdd?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  onColumnChange?: (key: string) => void;
  headers?: GenericTableHeader<any>[];
  visibleColumns?: string[];
};

const GenericMasterToolbar = ({
  addButtonText,
  onAdd,
  onExport,
  onFilter,
  onRefresh,
  onColumnChange,
  headers,
  visibleColumns,
}: GenericMasterToolbarProps) => {
  return (
    <>
      <div className="flex justify-between mt-2">
        {/* Add Button */}
        <ButtonComponent
          style={{ padding: "5px 20px", height: 40 }}
          radius={1}
          onClick={onAdd}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          {addButtonText}
        </ButtonComponent>

        {/*Table Controls */}
        <div>
          {/* Filter Icon */}
          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            onClick={onFilter}
            leftIcon={<FilterIcon />}
          >
            Filter
          </ButtonComponent>

          {/* Download Icon */}
          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            onClick={onExport}
            leftIcon={<DownloadIcon />}
          >
            Export
          </ButtonComponent>

          {/* Col Icon */}
          <ColumnVisibilityMenu
            headers={headers || []}
            visibleColumns={visibleColumns || []}
            onToggleColumn={onColumnChange ?? (() => {})}
          />

          {/* Refresh Icon */}
          <ButtonComponent
            style={{ height: 36, width: 10, paddingLeft: "28px" }}
            radius={1}
            textColor="#000000"
            bgColor="#ffffff"
            borderColor="#CACACA"
            leftIcon={<RefreshIcon />}
            onClick={onRefresh}
          >
            <></>
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};

export default GenericMasterToolbar;
