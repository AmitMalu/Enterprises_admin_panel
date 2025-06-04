import React, { useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { data, headers, ProductType } from "../../Config/Master/ProductConfig";
import { useNavigate } from "react-router-dom";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";

const ProductMaster = () => {
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (item: any) => {
    navigate(`/master/product-master/edit/${item.id}`, { state: item });
  };

  const handleAdd = () => {
    navigate("/master/product-master/add");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div className="p-2 w-full h-[calc(100vh-90px)] flex flex-col">
      <TextComponent fontSize={22} fontFamily="Manrope" fontWeight={500}>
        Product Master
      </TextComponent>

      <GenericMasterToolbar
        addButtonText="Add Product"
        onAdd={handleAdd}
        onSearchChange={handleSearchChange}
        searchValue={searchValue}
      />

      <GenericMasterTable<ProductType>
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

export default ProductMaster;
