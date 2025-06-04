import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { data, headers, VendorType } from "../../Config/Master/VendorConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";

const VendorMaster = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (item: any) => {
    navigate(`/master/vendor-master/edit/${item.id}`, { state: item });
  };

  const handleAdd = () => {
    navigate("/master/vendor-master/add");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Vendor Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Vendor"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      <GenericMasterTable<VendorType>
        data={data}
        headers={headers}
        renderExtraHeader={() => <></>} // empty header for action column/>
        renderExtraRowCell={(item) => (
          <div className="flex justify-center gap-2">
            <span className="cursor-pointer">
              <EyeIcon />
            </span>
            <span onClick={() => handleEdit(item)} className="cursor-pointer">
              <EditIcon />
            </span>
          </div>
        )}
      />
    </div>
  );
};
export default VendorMaster;
