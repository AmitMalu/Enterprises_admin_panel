import { useState } from "react";
import {
  EditIcon,
  EyeIcon,
} from "../../assets/Icons";
import TextComponent from "../../Components/Atoms/TextComponent";
import { data, headers, SubProductType } from "../../Config/Master/SubProductConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";

const SubProductMaster = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (item: any) => {
    navigate(`/master/sub-product-master/edit/${item.id}`, { state: item });
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const handleAdd = () => {
    navigate("/master/sub-product-master/add");
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Sub Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Sub Product"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      <GenericMasterTable<SubProductType>
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

export default SubProductMaster;
