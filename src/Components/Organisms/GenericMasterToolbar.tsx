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
  addButtonText?: string;
  onAdd?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  onColumnChange?: (key: string) => void;
  headers?: GenericTableHeader<any>[];
  visibleColumns?: string[];
  loading?: boolean;
  error?: null | string;
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
  loading = false,
  error = null
}: GenericMasterToolbarProps) => {
  return (
    <>
      <div className="flex justify-between mt-2">
        {/* Add Button */}
        <div className="flex items-end">
          {addButtonText && (
            <ButtonComponent
              style={{ padding: "4px 8px", height: 32, margin: 0 }}
              radius={1}
              onClick={onAdd}
              textColor="#fff"
              fontSize="14"
              bgColor="#BF0204"
              borderColor="#FFFFFF"
              leftIcon={<AddIconSvg />}
              disabled={!!loading || !!error}

            >
              {addButtonText}
            </ButtonComponent>
          )}
        </div>

        {/*Table Controls */}
        <div>
          {/* Filter Icon */}
          <ButtonComponent
            style={{ padding: "4px 8px", height: 32 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            fontSize="16"
            throttleMs={0}
            bgColor="#ffffff"
            onClick={onFilter}
            leftIcon={<FilterIcon />}
            disabled={!!loading || !!error}
          >
            Filter
          </ButtonComponent>

          {/* Download Icon */}
          <ButtonComponent
            style={{ padding: "4px 8px", height: 32 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            fontSize="16"
            throttleMs={5000}
            bgColor="#ffffff"
            onClick={onExport}
            leftIcon={<DownloadIcon />}
            disabled={!!loading || !!error}
          >
            Export
          </ButtonComponent>

          {/* Col Icon */}
          <ColumnVisibilityMenu
            headers={headers || []}
            visibleColumns={visibleColumns || []}
            onToggleColumn={onColumnChange ?? (() => { })}
          />

          {/* Refresh Icon */}
          <ButtonComponent
            style={{ height: 32, width: 6, paddingLeft: "28px" }}
            radius={1}
            textColor="#000000"
            bgColor="#ffffff"
            fontSize="16"
            throttleMs={5000}
            borderColor="#CACACA"
            leftIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={!!loading}
          >
            <></>
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};

export default GenericMasterToolbar;
