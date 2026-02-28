// import React from "react";
// import ButtonComponent from "../Atoms/ButtonComponent";
// import {
//   AddIconSvg,
//   ColIcon,
//   DownloadIcon,
//   DropDownArrowIcon,
//   FilterIcon,
//   GridIcon,
//   RefreshIcon,
//   SettingIcon,
// } from "../../assets/Icons";
// import TextInputComponent from "../Atoms/TextInputComponent";

// const PreFundingToolbar = ({
//   handleRefresh,
//   handleFilter,
//   handleExport,
//   handleGridView,
//   handleColumnView,
//   handleSettings,
//   handleSearchChange,
//   searchValue = "",
// }: {
//   handleRefresh?: () => void;
//   handleFilter?: () => void;
//   handleExport?: () => void;
//   handleGridView?: () => void;
//   handleColumnView?: () => void;
//   handleSettings?: () => void;
//   handleSearchChange?: (value: string) => void;
//   searchValue?: string;
// }) => {
//   return (
//     <>
//       {/* Refresh button and Search Input  */}
//       <div className="flex justify-between mt-4">
//         {/* Action Buttons */}
//         <div>
//           {/* Filter Button */}
//           <ButtonComponent
//             style={{ padding: "5px 16px", height: 36 }}
//             radius={1}
//             textColor={colors.text.primary}
//             borderColor={colors.border.strong}
//             bgColor={colors.text.inverse}
//             leftIcon={<FilterIcon />}
//           >
//             Filter
//           </ButtonComponent>

//           {/* Export Button */}
//           <ButtonComponent
//             style={{ padding: "5px 16px", height: 36 }}
//             radius={1}
//             textColor={colors.text.primary}
//             borderColor={colors.border.strong}
//             bgColor={colors.text.inverse}
//             leftIcon={<DownloadIcon />}
//           >
//             Export
//           </ButtonComponent>

//           {/* Grid Button */}
//           <ButtonComponent
//             style={{ height: 36, width: 10, paddingLeft: "28px" }}
//             radius={1}
//             textColor={colors.text.primary}
//             borderColor={colors.border.strong}
//             bgColor={colors.text.inverse}
//             leftIcon={<GridIcon />}
//           >
//             <></>
//           </ButtonComponent>

//           {/* Column Button */}
//           <ButtonComponent
//             style={{ padding: "5px 10px", height: 36 }}
//             radius={1}
//             textColor={colors.text.primary}
//             borderColor={colors.border.strong}
//             bgColor={colors.text.inverse}
//             leftIcon={<ColIcon />}
//           >
//             Cols
//           </ButtonComponent>

//           {/* Settings Dropdown */}
//           <ButtonComponent
//             style={{ height: 36, padding: "5px" }}
//             radius={1}
//             textColor={colors.text.primary}
//             borderColor={colors.border.strong}
//             bgColor={colors.text.inverse}
//             leftIcon={<SettingIcon />}
//           >
//             <DropDownArrowIcon />
//           </ButtonComponent>
//         </div>

//         <div className="flex items-center gap-2">
//           {/* Refresh button */}
//           <ButtonComponent
//             style={{ height: 36, width: 10, paddingLeft: "28px" }}
//             radius={1}
//             textColor={colors.text.primary}
//             bgColor={colors.text.inverse}
//             borderColor={colors.border.strong}
//             leftIcon={<RefreshIcon />}
//           >
//             <></>
//           </ButtonComponent>

//           {/* Search Input */}
//           <TextInputComponent
//             size="md"
//             type="text"
//             placeholder="Search"
//             name="search"
//             value={searchValue}
//             onChange={(e) => handleSearchChange?.(e.target.value)}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default PreFundingToolbar;
