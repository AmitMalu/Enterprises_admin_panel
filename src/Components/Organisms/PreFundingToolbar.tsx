import React from "react";
import ButtonComponent from "../Atoms/ButtonComponent";
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
import TextInputComponent from "../Atoms/TextInputComponent";

const PreFundingToolbar = ({
  handleAdd,
  handleRefresh,
  handleFilter,
  handleExport,
  handleGridView,
  handleColumnView,
  handleSettings,
  handleSearchChange,
  searchValue = "",
}: {
  handleAdd: () => void;
  handleRefresh?: () => void;
  handleFilter?: () => void;
  handleExport?: () => void;
  handleGridView?: () => void;
  handleColumnView?: () => void;
  handleSettings?: () => void;
  handleSearchChange?: (value: string) => void;
  searchValue?: string;
}) => {
  return (
    <>
      {/* Refresh button and Search Input  */}
      <div className="flex justify-end items-center gap-2 mt-2">
        {/* Refresh button */}
        <ButtonComponent
          style={{ height: 40, width: 10, paddingLeft: "28px" }}
          radius={1}
          textColor="#000000"
          bgColor="#ffffff"
          borderColor="#CACACA"
          leftIcon={<RefreshIcon />}
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
          onChange={(e) => handleSearchChange?.(e.target.value)}    
        />
      </div>
      <div className="flex justify-between mt-2">
        {/* Add Product Button */}
        <ButtonComponent
          onClick={handleAdd}
          style={{ padding: "5px 20px", height: 40 }}
          radius={1}
          textColor="#fff"
          bgColor="#BF0204"
          borderColor="#FFFFFF"
          leftIcon={<AddIconSvg />}
        >
          Add Product
        </ButtonComponent>

        {/* Action Buttons */}
        <div>
          {/* Filter Button */}
          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<FilterIcon />}
          >
            Filter
          </ButtonComponent>

          {/* Export Button */}
          <ButtonComponent
            style={{ padding: "5px 16px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<DownloadIcon />}
          >
            Export
          </ButtonComponent>

          {/* Grid Button */}
          <ButtonComponent
            style={{ height: 36, width: 10, paddingLeft: "28px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<GridIcon />}
          >
            <></>
          </ButtonComponent>

          {/* Column Button */}
          <ButtonComponent
            style={{ padding: "5px 10px", height: 36 }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<ColIcon />}
          >
            Cols
          </ButtonComponent>

          {/* Settings Dropdown */}
          <ButtonComponent
            style={{ height: 36, padding: "5px" }}
            radius={1}
            textColor="#000000"
            borderColor="#CACACA"
            bgColor="#ffffff"
            leftIcon={<SettingIcon />}
          >
            <DropDownArrowIcon />
          </ButtonComponent>
        </div>
      </div>
    </>
  );
};

export default PreFundingToolbar;
