import React, { useEffect, useState } from "react";
import TextComponent from "../../Components/Atoms/TextComponent";
import { EditIcon, EyeIcon } from "../../assets/Icons";
import { useNavigate } from "react-router-dom";
import GenericMasterTable from "../../Components/Organisms/GenericMasterTable";
import GenericMasterToolbar from "../../Components/Organisms/GenericMasterToolbar";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { fetchVendor } from "../../Redux/Features/Masters/VendorMaster/thunks";
import { toast } from "react-toastify";
import { mapToVendorTableType } from "../../Redux/Features/Masters/VendorMaster/utils";
import ShimmerTableRows from "../../Components/Atoms/ShimmerTableRows";
import { headers, VendorTableType } from "../../Config/Master/VendorConfig";

const VendorMaster = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, loaded, vendors } = useAppSelector(
    (state) => state.masters.vendor
  );
  const [searchValue, setSearchValue] = useState("");

  const handleEdit = (id: any) => {
    navigate(`/master/vendor-master/edit/${id}`, { state: id });
  };

  const handleAdd = () => {
    navigate("/master/vendor-master/add");
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (!loaded) {
      dispatch(fetchVendor())
        .unwrap()
        .then()
        .catch((err) => toast.error(err));
    }
  }, []);

  const data = vendors?.map(mapToVendorTableType);

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

      {loading ? (
        // Render shimmer
        <ShimmerTableRows rowCount={6} columnCount={headers.length} />
      ) : (
        <GenericMasterTable<VendorTableType>
          data={data}
          headers={headers}
          renderExtraHeader={() => <></>} // empty header for action column/>
          renderExtraRowCell={(item) => (
            <div className="flex justify-center gap-2">
              <span className="cursor-pointer">
                <EyeIcon />
              </span>
              <span
                onClick={() => handleEdit(item?.id ?? "")}
                className="cursor-pointer"
              >
                <EditIcon />
              </span>
            </div>
          )}
        />
      )}
    </div>
  );
};
export default VendorMaster;
