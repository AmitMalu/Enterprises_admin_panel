import {
  AddIconSvg,
  ColIcon,
  DownloadIcon,
  DropDownArrowIcon,
  FilterIcon,
  GridIcon,
  RefreshIcon,
  SettingIcon,
} from "../../assets/Icons";
import ButtonComponent from "../Atoms/ButtonComponent";
import TextInputComponent from "../Atoms/TextInputComponent";

type GenericMasterToolbarProps = {
  addButtonText: string;
  onAdd?: () => void;
  onSearchChange?: (value: string) => void;
  searchValue?: string;
  onExport?: () => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  onGridView?: () => void;
  onColumnView?: () => void;
  onSettings?: () => void;
};

const GenericMasterToolbar = ({
  addButtonText,
  onAdd,
  onSearchChange,
  searchValue = "",
  onExport,
  onFilter,
  onRefresh,
  onGridView,
  onColumnView,
  onSettings,
}: GenericMasterToolbarProps) => {
  return (
    <>
      {/* Refresh Icon and Search */}
      <div className="flex justify-end items-center gap-2 mt-2">
        {/* Refresh Icon */}
        <ButtonComponent
          style={{ height: 40, width: 10, paddingLeft: "28px" }}
          radius={1}
          textColor="#000000"
          bgColor="#ffffff"
          borderColor="#CACACA"
          leftIcon={<RefreshIcon />}
          onClick={onRefresh}
        >
          <></>
        </ButtonComponent>

        {/* Search Input */}
        <TextInputComponent
          size="md"
          type="text"
          placeholder="Search"
          name="search"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>

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

          {/* Grid Icon  */}
          <ButtonComponent
            style={{ height: 36, width: 10, paddingLeft: "28px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            onClick={onGridView}
            leftIcon={<GridIcon />}
          >
            <></>
          </ButtonComponent>

          {/* Col Icon */}
          <ButtonComponent
            style={{ padding: "5px 10px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            onClick={onColumnView}
            leftIcon={<ColIcon />}
          >
            Cols
          </ButtonComponent>

          {/* Setting Icon */}
          <ButtonComponent
            style={{ height: 36, padding: "5px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            onClick={onSettings}
            leftIcon={<SettingIcon />}
          >
            <DropDownArrowIcon />
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};

export default GenericMasterToolbar;
