import {
  AddIconSvg,
  DownloadIcon,
  FilterIcon,
  RefreshIcon,
} from "../../assets/Icons";
import ButtonComponent from "../Atoms/ButtonComponent";
import { GenericTableHeader } from "../../Utils/utils";
import ColumnVisibilityMenu from "../Molecules/ColumnVisibilityMenu";
import TextInputComponent from "../Atoms/TextInputComponent";
import { useEffect, useRef } from "react";
import { colors } from "../../theme/colors";

type GenericMasterToolbarProps = {
  addButtonText?: string;
  onAdd?: () => void;
  onExport?: () => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  onColumnChange?: (key: string) => void;
  headers?: GenericTableHeader<any>[];
  visibleColumns?: string[];
  onToggleAll?: (selectAll: boolean) => void;
  loading?: boolean;
  error?: null | string;
  onSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchValue?: string;
  searchPlaceholder?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

const GenericMasterToolbar = ({
  addButtonText,
  onAdd,
  onExport,
  onFilter,
  onSearch,
  searchValue,
  onKeyDown,
  searchPlaceholder = "Search...",
  onRefresh,
  onColumnChange,
  onToggleAll,
  headers,
  visibleColumns,
  loading = false,
  error = null,
}: GenericMasterToolbarProps) => {

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!loading && inputRef.current) {
      inputRef.current.focus();
    }
  }, [loading]);

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
              textColor={colors.text.inverse}
              fontSize="14"
              bgColor={colors.brand.primary}
              borderColor={colors.text.inverse}
              leftIcon={<AddIconSvg />}
              disabled={!!loading}

            >
              {addButtonText}
            </ButtonComponent>
          )}
        </div>

        {/*Table Controls */}
        <div>
          {/* Search Bar */}
          {onSearch && (
            <TextInputComponent
              ref={inputRef}
              className="inline-block h-[40px] w-[250px] "
              name="search"
              size="sm"
              value={searchValue || ""}
              placeholder={searchPlaceholder}
              onKeyDown={onKeyDown}
              onChange={onSearch}
              disabled={loading}
            />
          )}

          {/* Filter Icon */}
          {onFilter && <ButtonComponent
            style={{ padding: "4px 8px", height: 32 }}
            radius={1}
            textColor={colors.text.primary}
            borderColor={colors.border.strong}
            fontSize="16"
            throttleMs={0}
            bgColor={colors.text.inverse}
            onClick={onFilter}
            leftIcon={<FilterIcon />}
            disabled={!!loading || !!error}
          >
            Filter
          </ButtonComponent>}

          {/* Download Icon */}
          {onExport && <ButtonComponent
            style={{ padding: "4px 8px", height: 32 }}
            radius={1}
            textColor={colors.text.primary}
            borderColor={colors.border.strong}
            fontSize="16"
            throttleMs={5000}
            bgColor={colors.text.inverse}
            onClick={onExport}
            leftIcon={<DownloadIcon />}
            disabled={!!loading || !!error}
          >
            Export
          </ButtonComponent>}

          {/* Col Icon */}
          {onColumnChange && <ColumnVisibilityMenu
            headers={headers || []}
            visibleColumns={visibleColumns || []}
            onToggleColumn={onColumnChange ?? (() => { })}
            onToggleAll={onToggleAll}
          />}

          {/* Refresh Icon */}
          {onRefresh && <ButtonComponent
            style={{ height: 32, width: 6, paddingLeft: "28px" }}
            radius={1}
            textColor={colors.text.primary}
            bgColor={colors.text.inverse}
            fontSize="16"
            throttleMs={5000}
            borderColor={colors.border.strong}
            leftIcon={<RefreshIcon />}
            onClick={onRefresh}
            disabled={!!loading}
          >
            <></>
          </ButtonComponent>}
        </div>
      </div>
    </>
  );
};

export default GenericMasterToolbar;
